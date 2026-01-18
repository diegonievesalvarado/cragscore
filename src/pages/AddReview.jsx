import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { gyms } from "../data/gym.js";
import StarRating from "../components/StarRating.jsx";
import { addReview } from "../lib/reviews.js";

const clamp = (n) => Math.max(1, Math.min(5, n));

export default function AddReview() {
  const { id } = useParams();
  const gym = useMemo(() => gyms.find((g) => g.id === id), [id]);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [overall, setOverall] = useState(0);
  const [setting, setSetting] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [crowding, setCrowding] = useState(0);
  const [training, setTraining] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  if (!gym) {
    return (
      <section className="stack">
        <h1>Gym not found</h1>
        <Link className="btn" to="/">Back to browse</Link>
      </section>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const requiredStars = [overall, setting, cleanliness, crowding, training];
    if (requiredStars.some((v) => v < 1)) {
      setError("Please rate all categories (1–5 stars).");
      return;
    }
    if (text.trim().length < 20) {
      setError("Review must be at least 20 characters.");
      return;
    }

    addReview({
      id: crypto.randomUUID(),
      gymId: gym.id,
      name: name.trim(),
      overall: clamp(overall),
      setting: clamp(setting),
      cleanliness: clamp(cleanliness),
      crowding: clamp(crowding),
      training: clamp(training),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    });

    nav(`/gyms/${gym.id}`);
  }

  return (
    <section className="stack">
      <div className="detail-header">
        <div>
          <h1>Write a review</h1>
          <p className="muted">{gym.name} • {gym.location}</p>
        </div>
        <div className="detail-actions">
          <Link className="btn ghost" to={`/gyms/${gym.id}`}>Cancel</Link>
        </div>
      </div>

      <form className="card stack" onSubmit={onSubmit}>
        {error && <p className="error">{error}</p>}

        <div className="field">
          <label htmlFor="name">Name (optional)</label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Diego"
            autoComplete="name"
          />
        </div>

        <div className="field">
          <label>Overall</label>
          <StarRating value={overall} onChange={setOverall} label="Overall" />
        </div>

        <div className="field">
          <label>Route setting</label>
          <StarRating value={setting} onChange={setSetting} label="Route setting" />
        </div>

        <div className="field">
          <label>Cleanliness</label>
          <StarRating value={cleanliness} onChange={setCleanliness} label="Cleanliness" />
        </div>

        <div className="field">
          <label>Crowding</label>
          <StarRating value={crowding} onChange={setCrowding} label="Crowding" />
        </div>

        <div className="field">
          <label>Training area</label>
          <StarRating value={training} onChange={setTraining} label="Training area" />
        </div>

        <div className="field">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Talk about setting style, variety, crowding, training equipment, etc…"
            rows={6}
          />
          <p className="muted small">Minimum 20 characters.</p>
        </div>

        <button className="btn" type="submit">Submit review</button>
      </form>
    </section>
  );
}