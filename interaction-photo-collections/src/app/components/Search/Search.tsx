import "./style.css";

export default function search() {
  return (
    <div className="search-field">
      <input
        type="search"
        id="search"
        className="search-field__input"
        placeholder="Search.."
      />
      <button type="button" className="search-field__button">
        <img src="search.svg" alt="search" />
      </button>
    </div>
  );
}
