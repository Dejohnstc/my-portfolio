/* global process */
// Sends you an email when a new review comes in (Gmail SMTP).
// Files starting with "_" in /api are helpers, not public endpoints.
//
// Environment variables (in .env and in Vercel):
//   GMAIL_USER          the Gmail address that sends the email, e.g. obiresoffice@gmail.com
//   GMAIL_APP_PASSWORD  a 16-character Gmail App Password (NOT your normal Gmail password)
//   NOTIFY_EMAIL        (optional) where to send alerts — defaults to GMAIL_USER
//   SITE_URL            (optional) defaults to https://www.obiresoffice.com

import nodemailer from "nodemailer";

let transporter;

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function buildReviewEmail(review, siteUrl) {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  const admin = `${siteUrl.replace(/\/+$/, "")}/admin`;
  const lines = [
    ["Name", review.name],
    ["Company / role", review.role],
    ["Project", review.project],
    ["Rating", `${stars} (${review.rating}/5)`],
  ].filter(([, v]) => v);

  const text = [
    "You have a new review waiting for approval on ObiresOffice.",
    "",
    ...lines.map(([k, v]) => `${k}: ${v}`),
    "",
    `"${review.review}"`,
    "",
    `Approve or delete it here: ${admin}`,
  ].join("\n");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#16181d">
    <p style="font-size:20px;font-weight:700;margin:0 0 16px">Obires<span style="color:#d97706">Office</span></p>
    <p style="margin:0 0 16px">You have a new review waiting for approval.</p>
    <table style="border-collapse:collapse;margin:0 0 16px">
      ${lines
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0;font-weight:600">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    <blockquote style="margin:0 0 24px;padding:12px 16px;background:#faf6ec;border-left:4px solid #fbbf24;font-size:16px">${esc(review.review)}</blockquote>
    <a href="${esc(admin)}" style="display:inline-block;background:#fbbf24;color:#0c0d10;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px">Review it in Admin →</a>
    <p style="color:#888;font-size:12px;margin-top:24px">It stays hidden on your site until you approve it.</p>
  </div>`;

  return {
    subject: `⭐ New review from ${review.name} (${review.rating}/5)`,
    text,
    html,
  };
}

export async function notifyNewReview(review) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("[notify] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email alert");
    return false;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: pass.replace(/\s+/g, "") }, // app passwords are often copied with spaces
    });
  }
  const mail = buildReviewEmail(review, process.env.SITE_URL || "https://www.obiresoffice.com");
  await transporter.sendMail({
    from: `"ObiresOffice Reviews" <${user}>`,
    to: process.env.NOTIFY_EMAIL || user,
    ...mail,
  });
  return true;
}
