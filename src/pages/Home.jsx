import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { gyms } from "../data/gym.js";

import { getReviewsForGym } from "../lib/reviews.js";

/**
 * Helpers
 */
const ALL_TAGS = Array.from(new Set(gyms.flatMap((g) => g.tags || []))).sort();

function avgOverall(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + (Number(r.overall) || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function primaryExternal(gym) {
  if (!gym?.externalRatings?.length) return null;
  const google = gym.externalRatings.find((x) =>
    String(x.source || "").toLowerCase().includes("google")
  );
  return google || gym.externalRatings[0];
}


function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`chip ${active ? "chip-active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("top"); // "top" | "az"
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = gyms.filter((g) => {
      const matchesQuery =
        !q ||
        g.name.toLowerCase().includes(q) ||
        (g.location || "").toLowerCase().includes(q);

      const matchesTag = tag === "All" || (g.tags || []).includes(tag);

      return matchesQuery && matchesTag;
    });

    const sorted = [...base].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);

      // "top": by CragScore avg desc; then review count; then name
      const aReviews = getReviewsForGym(a.id);
      const bReviews = getReviewsForGym(b.id);
      const aAvg = avgOverall(aReviews);
      const bAvg = avgOverall(bReviews);

      if (bAvg !== aAvg) return bAvg - aAvg;
      if (bReviews.length !== aReviews.length) return bReviews.length - aReviews.length;
      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [query, tag, sort]);

  return (
    <section className="stack">
      <div className="hero">
        
        <p className="muted" id="how">
          CragScore is climber-specific (setting, crowding, training). External ratings are context only.
        </p>

        <h1>Find and rate rock climbing gyms.</h1>

        <div className="search-row" role="search">
          <label className="sr-only" htmlFor="search">
            Search gyms
          </label>
          <input
            id="search"
            className="input"
            placeholder="Search by gym or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="chips" aria-label="Filter by type">
          <Chip active={tag === "All"} onClick={() => setTag("All")}>
            All
          </Chip>
          {ALL_TAGS.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="small muted" style={{ alignSelf: "center" }}>
            Sort:
          </span>
          <Chip active={sort === "top"} onClick={() => setSort("top")}>
            Top rated
          </Chip>
          <Chip active={sort === "az"} onClick={() => setSort("az")}>
            A–Z
          </Chip>
        </div>
      </div>

      {isLoading ? (
        <div className="card">
          <h2 className="card-title">Loading gyms…</h2>
          <p className="muted">Pulling the latest field reports.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" id="browse">
          <h2 className="card-title">No matches</h2>
          <p className="muted">
            Try removing a filter or searching a different gym name.
          </p>
        </div>
      ) : (
        <div className="grid" id="browse">
          {filtered.map((g) => {
            const reviews = getReviewsForGym(g.id);
            const cragAvg = avgOverall(reviews);
            const ext = primaryExternal(g);

            return (
              <article key={g.id} className="card">
                <h2 className="card-title">{g.name}</h2>
                <p className="muted">{g.location}</p>

                <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <span className="badge">
                    {cragAvg ? `CragScore ★ ${cragAvg}` : "CragScore: No ratings yet"}
                  </span>
                  <span className="muted small">{reviews.length} review(s)</span>
                </div>

                {ext && (
                  <p className="muted small" style={{ marginTop: 10 }}>
                    External: {ext.source} ★ {ext.rating}
                    {ext.reviewCount ? ` (${ext.reviewCount})` : ""}
                  </p>
                )}

                {/* Only action here: view details */}
                <div style={{ marginTop: 12 }}>
                  <Link className="btn" to={`/gyms/${g.id}`}>
                    View details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}