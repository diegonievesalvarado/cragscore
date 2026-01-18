export default function Chip({ active, children, onClick }) {
    return (
      <button
        type="button"
        className={`chip ${active ? "chip-active" : ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }