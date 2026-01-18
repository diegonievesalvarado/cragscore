import { Link, useParams } from "react-router-dom";
import { gyms } from "../data/gym.js";
import { getReviewsForGym } from "../lib/reviews.js";

function avg(reviews, key) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r[key], 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export default function GymDetail() {
  const { id } = useParams();
  const gym = gyms.find((g) => g.id === id);

  if (!gym) {
    return (
      <section className="stack">
        <h1>Gym not found</h1>
        <Link className="btn" to="/">Back to browse</Link>
      </section>
    );
  }

  const reviews = getReviewsForGym(gym.id);

  const summary = {
    overall: avg(reviews, "overall"),
    setting: avg(reviews, "setting"),
    cleanliness: avg(reviews, "cleanliness"),
    crowding: avg(reviews, "crowding"),
    training: avg(reviews, "training"),
  };

  return (
    <section className="stack">
     
<div className="card" style={{ padding: 0 }}>
  <div
    style={{
      padding: 18,
      borderBottom: "2px solid var(--ink)",
      background: "var(--paper)",
      color: "var(--ink)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 14,
      flexWrap: "wrap",
    }}
  >
    <div style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-block",
            padding: "4px 8px",
            border: "2px solid var(--ink)",
            background: "var(--accent)",
            fontWeight: 900,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            fontSize: 12,
            whiteSpace: "nowrap",
          }}
        >
          Gym Profile
        </span>

        <div
          style={{
            fontFamily: '"Archivo", system-ui, sans-serif',
            fontWeight: 900,
            letterSpacing: ".01em",
            textTransform: "uppercase",
            fontSize: "clamp(22px, 3vw, 34px)",
            lineHeight: 1.05,
          }}
        >
          {gym.name}
        </div>

        <div className="muted small">{gym.location}</div>
      </div>

      {gym.externalRatings?.length > 0 && (
        <p className="muted small" style={{ margin: "10px 0 0" }}>
          External:&nbsp;
          {gym.externalRatings.map((x) => (
            <span key={x.source} style={{ marginRight: 10 }}>
              {x.source} ★ {x.rating}
            </span>
          ))}
        </p>
      )}
    </div>

    {/* Zine callout action */}
    <Link
      to={`/gyms/${gym.id}/review`}
      className="btn"
      style={{
        alignSelf: "flex-start",
        whiteSpace: "nowrap",
      }}
    >
      Write a review
    </Link>
  </div>

  {/* Official external links */}
  <div
    style={{
      padding: 14,
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      background: "var(--paper)",
    }}
  >
    {gym.galleryUrl && (
      <a className="btn ghost" href={gym.galleryUrl} target="_blank" rel="noreferrer">
        View official photos
      </a>
    )}
    {gym.instagramUrl && (
      <a className="btn ghost" href={gym.instagramUrl} target="_blank" rel="noreferrer">
        Instagram
      </a>
    )}
    {gym.mapsUrl && (
      <a className="btn ghost" href={gym.mapsUrl} target="_blank" rel="noreferrer">
        Google Maps
      </a>
    )}
  </div>
</div>

      {/* Header + external ratings */}
      <div className="detail-header">
        <div>
          {gym.externalRatings?.length > 0 && (
            <p className="muted small">
              External:&nbsp;
              {gym.externalRatings.map((x) => (
                <span key={x.source} style={{ marginRight: 10 }}>
                  {x.source} ★ {x.rating}
                </span>
              ))}
            </p>
          )}
        </div>

        
      </div>

      {/* About */}
      <div className="card">
        <h2>About this gym</h2>
        <p className="muted">{gym.heroNote}</p>

        <div className="tag-row" style={{ marginTop: 12 }}>
          {gym.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {gym.website && (
          <p className="small" style={{ marginTop: 12 }}>
            <a href={gym.website} target="_blank" rel="noreferrer">
              Visit official website →
            </a>
          </p>
        )}
      </div>

      {/* CragScore breakdown */}
      <div className="card">
        <h2>CragScore rating breakdown</h2>

        <div className="breakdown">
          <div className="row"><span>Overall</span><span>{summary.overall || "—"}</span></div>
          <div className="row"><span>Route setting</span><span>{summary.setting || "—"}</span></div>
          <div className="row"><span>Cleanliness</span><span>{summary.cleanliness || "—"}</span></div>
          <div className="row"><span>Crowding</span><span>{summary.crowding || "—"}</span></div>
          <div className="row"><span>Training area</span><span>{summary.training || "—"}</span></div>
        </div>

        <p className="muted small" style={{ marginTop: 10 }}>
          Based on {reviews.length} CragScore review(s). Ratings are climber-specific.
        </p>
      </div>

      {/* Reviews */}
      <div className="stack">
        <h2>Reviews</h2>

        {reviews.length === 0 ? (
          <p className="muted">No CragScore reviews yet. Be the first to review this gym.</p>
        ) : (
          <div className="stack">
            {reviews.map((r) => (
              <article key={r.id} className="card">
                <div className="review-head">
                  <strong>{r.name || "Anonymous"}</strong>
                  <span className="badge">★ {r.overall}</span>
                </div>

                <p className="muted small">
                  Setting {r.setting} • Clean {r.cleanliness} •
                  Crowding {r.crowding} • Training {r.training}
                </p>

                <p>{r.text}</p>

                <p className="muted small">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        )}

        <Link className="btn ghost" to="/">← Back to browse</Link>
      </div>
    </section>
  );
}