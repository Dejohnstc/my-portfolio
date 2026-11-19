import { useCallback, useEffect, useState } from "react";

// Private page at /admin — approve, unpublish or delete client reviews.
// The admin key is the ADMIN_KEY you set in Vercel's Environment Variables.

export default function Admin() {
  const [key, setKey] = useState(() => {
    try {
      return sessionStorage.getItem("adminKey") || "";
    } catch {
      return "";
    }
  });
  const [input, setInput] = useState("");
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "Reviews admin · ObiresOffice";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
  }, []);

  const call = useCallback(
    async (method, { query = "", body } = {}) => {
      const r = await fetch(`/api/reviews${query}`, {
        method,
        headers: { "x-admin-key": key, ...(body ? { "Content-Type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(data.error || "Request failed"), { status: r.status });
      return data;
    },
    [key]
  );

  const [tick, setTick] = useState(0);
  const load = () => setTick((t) => t + 1);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    call("GET", { query: "?all=1" })
      .then((data) => {
        if (cancelled) return;
        setError("");
        setReviews(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        if (e.status === 401) {
          try {
            sessionStorage.removeItem("adminKey");
          } catch {
            /* ignore */
          }
          setKey("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key, call, tick]);

  function login(e) {
    e.preventDefault();
    try {
      sessionStorage.setItem("adminKey", input);
    } catch {
      /* ignore */
    }
    setKey(input);
  }

  function logout() {
    try {
      sessionStorage.removeItem("adminKey");
    } catch {
      /* ignore */
    }
    setKey("");
    setReviews(null);
  }

  async function act(fn) {
    try {
      await fn();
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  const shell = "min-h-screen bg-ink text-paper font-body px-5 py-10";

  if (!key) {
    return (
      <div className={`${shell} grid place-items-center`}>
        <form onSubmit={login} className="w-full max-w-sm p-8 rounded-3xl bg-ink-2 border border-white/10">
          <p className="font-display text-xl font-bold">
            Obires<span className="text-amber-500">Office</span> · Reviews
          </p>
          <label className="block mt-6 text-sm text-paper/60" htmlFor="k">
            Admin key
          </label>
          <input
            id="k"
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-2 w-full rounded-xl bg-ink border border-white/15 px-4 py-3 focus:outline-none focus:border-amber-400"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button className="mt-5 w-full py-3 rounded-full bg-amber-400 text-ink font-semibold">Sign in</button>
        </form>
      </div>
    );
  }

  const list = (reviews || []).filter((r) =>
    filter === "all" ? true : filter === "pending" ? !r.approved : r.approved
  );
  const pending = (reviews || []).filter((r) => !r.approved).length;

  return (
    <div className={shell}>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold">
            Obires<span className="text-amber-500">Office</span> · Reviews
          </h1>
          <div className="flex gap-2 text-sm">
            <a href="/" className="px-4 py-2 rounded-full border border-white/15 hover:bg-white/10">
              View site
            </a>
            <button onClick={logout} className="px-4 py-2 rounded-full border border-white/15 hover:bg-white/10">
              Sign out
            </button>
          </div>
        </header>

        <div className="mt-8 flex gap-2 text-sm">
          {[
            ["pending", `Pending (${pending})`],
            ["approved", "Published"],
            ["all", "All"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-4 py-2 rounded-full ${filter === v ? "bg-amber-400 text-ink font-semibold" : "bg-white/5 hover:bg-white/10"}`}
            >
              {label}
            </button>
          ))}
          <button onClick={load} className="ml-auto px-4 py-2 rounded-full bg-white/5 hover:bg-white/10">
            ↻ Refresh
          </button>
        </div>

        {error && <p className="mt-6 text-red-400">{error}</p>}
        {!reviews && !error && <p className="mt-10 text-paper/50">Loading…</p>}
        {reviews && list.length === 0 && <p className="mt-10 text-paper/50">Nothing here yet.</p>}

        <ul className="mt-6 space-y-4">
          {list.map((r) => (
            <li key={r.id} className="p-6 rounded-2xl bg-ink-2 border border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    {r.name}
                    {r.role && <span className="text-paper/50 font-normal"> · {r.role}</span>}
                  </p>
                  <p className="text-xs text-paper/45 mt-1">
                    {new Date(r.createdAt).toLocaleString()}
                    {r.project && ` · Project: ${r.project}`}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${
                    r.approved ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-400/15 text-amber-400"
                  }`}
                >
                  {r.approved ? "Published" : "Pending"}
                </span>
              </div>
              <p className="mt-3 text-amber-500">
                {"★".repeat(r.rating)}
                <span className="text-white/15">{"★".repeat(5 - r.rating)}</span>
              </p>
              <p className="mt-2 text-paper/80">{r.quote}</p>
              <div className="mt-5 flex gap-2 text-sm">
                {r.approved ? (
                  <button
                    onClick={() => act(() => call("PATCH", { body: { id: r.id, approved: false } }))}
                    className="px-4 py-2 rounded-full border border-white/15 hover:bg-white/10"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => act(() => call("PATCH", { body: { id: r.id, approved: true } }))}
                    className="px-4 py-2 rounded-full bg-emerald-500 text-ink font-semibold hover:bg-emerald-400"
                  >
                    ✓ Approve
                  </button>
                )}
                <DeleteButton onConfirm={() => act(() => call("DELETE", { query: `?id=${r.id}` }))} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Two-step delete (no browser confirm() pop-up)
function DeleteButton({ onConfirm }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  return (
    <button
      onClick={() => (armed ? onConfirm() : setArmed(true))}
      className={`px-4 py-2 rounded-full ${armed ? "bg-red-500 text-white font-semibold" : "border border-white/15 hover:bg-white/10"}`}
    >
      {armed ? "Tap again to delete" : "Delete"}
    </button>
  );
}
