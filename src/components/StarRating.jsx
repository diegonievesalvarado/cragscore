export default function StarRating({ value = 0, onChange, label = "Rating" }) {
    const stars = [1, 2, 3, 4, 5];
  
    return (
      <div className="stars" aria-label={label}>
        {stars.map((n) => {
          const active = n <= value;
          return (
            <button
              key={n}
              type="button"
              className={`star ${active ? "active" : ""}`}
              onClick={() => onChange?.(n)}
              aria-label={`${label}: ${n} star${n === 1 ? "" : "s"}`}
            >
              ★
            </button>
          );
        })}
      </div>
    );
  }