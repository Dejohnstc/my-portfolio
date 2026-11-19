/* global process, Buffer */
// Vercel serverless function: /api/reviews
//
// Needs these Environment Variables in Vercel (Project → Settings → Environment Variables):
//   MONGODB_URI   your MongoDB connection string (mongodb+srv://...)
//   ADMIN_KEY     a long secret password you choose — used on /admin to approve reviews
//   MONGODB_DB    (optional) database name, defaults to "obiresoffice"
//   GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_EMAIL  — email alerts for new reviews (see api/_notify.js)
//
// GET    /api/reviews              → approved reviews (public)
// GET    /api/reviews?all=1        → every review incl. pending   (admin)
// POST   /api/reviews              → submit a review, saved as pending (public)
// PATCH  /api/reviews  {id, approved} → approve / unpublish       (admin)
// DELETE /api/reviews?id=...       → delete a review              (admin)

import { MongoClient, ObjectId } from "mongodb";
import { createHash, timingSafeEqual } from "node:crypto";
import { notifyNewReview } from "./_notify.js";

const LIMITS = { name: 80, role: 100, project: 100, review: 1200 };
const MAX_PER_IP_PER_HOUR = 3;

let clientPromise;
async function mongoCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "obiresoffice").collection("reviews");
}

function isAdmin(req) {
  const expected = process.env.ADMIN_KEY || "";
  const given = String(req.headers["x-admin-key"] || "");
  if (expected.length < 12 || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function clientIpHash(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = fwd || req.socket?.remoteAddress || "unknown";
  return createHash("sha256").update(ip + (process.env.ADMIN_KEY || "")).digest("hex").slice(0, 32);
}

const clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

function publicShape(r) {
  return {
    id: String(r._id),
    name: r.name,
    role: r.role || "",
    project: r.project || "",
    rating: r.rating,
    quote: r.review,
    createdAt: r.createdAt,
  };
}

export function createHandler(getCollection = mongoCollection, notify = notifyNewReview) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    try {
      const col = await getCollection();

      if (req.method === "GET") {
        if (req.query?.all) {
          if (!isAdmin(req)) return res.status(401).json({ error: "Wrong admin key" });
          const all = await col.find({}).sort({ createdAt: -1 }).limit(500).toArray();
          return res.status(200).json(all.map((r) => ({ ...publicShape(r), approved: !!r.approved })));
        }
        const approved = await col.find({ approved: true }).sort({ createdAt: -1 }).limit(50).toArray();
        return res.status(200).json(approved.map(publicShape));
      }

      if (req.method === "POST") {
        const body = req.body || {};
        // Honeypot: real people never see or fill the "website" field; bots usually do.
        if (body.website) return res.status(200).json({ ok: true });

        const doc = {
          name: clean(body.name, LIMITS.name),
          role: clean(body.role, LIMITS.role),
          project: clean(body.project, LIMITS.project),
          review: clean(body.review, LIMITS.review),
          rating: Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5)),
        };
        if (doc.name.length < 2) return res.status(400).json({ error: "Please enter your name." });
        if (doc.review.length < 10) return res.status(400).json({ error: "Please write a little more in your review." });
        if (/https?:\/\/|www\./i.test(doc.review)) {
          return res.status(400).json({ error: "Please remove links from your review." });
        }

        const ipHash = clientIpHash(req);
        const recent = await col.countDocuments({ ipHash, createdAt: { $gt: new Date(Date.now() - 3600_000) } });
        if (recent >= MAX_PER_IP_PER_HOUR) {
          return res.status(429).json({ error: "Thanks! You've already sent a review recently." });
        }

        await col.insertOne({ ...doc, approved: false, ipHash, createdAt: new Date() });

        // Email alert. Awaited so it finishes before the serverless function stops,
        // but a failed email never blocks the review from being saved.
        try {
          await notify(doc);
        } catch (err) {
          console.error("[reviews] email alert failed:", err.message);
        }
        return res.status(201).json({ ok: true });
      }

      if (req.method === "PATCH" || req.method === "DELETE") {
        if (!isAdmin(req)) return res.status(401).json({ error: "Wrong admin key" });
        const id = req.method === "PATCH" ? req.body?.id : req.query?.id;
        if (!id || !ObjectId.isValid(String(id))) return res.status(400).json({ error: "Invalid id" });
        const _id = new ObjectId(String(id));

        if (req.method === "PATCH") {
          const r = await col.updateOne({ _id }, { $set: { approved: !!req.body?.approved } });
          return r.matchedCount ? res.status(200).json({ ok: true }) : res.status(404).json({ error: "Not found" });
        }
        const r = await col.deleteOne({ _id });
        return r.deletedCount ? res.status(200).json({ ok: true }) : res.status(404).json({ error: "Not found" });
      }

      res.setHeader("Allow", "GET, POST, PATCH, DELETE");
      return res.status(405).json({ error: "Method not allowed" });
    } catch (err) {
      console.error("[reviews]", err);
      return res.status(500).json({ error: "Server error — please try again later." });
    }
  };
}

export default createHandler();
