import "./styles/Header.css";
export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <h1 className="logo-text">ReadTogether</h1>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search books or friends..."
            />
          </div>
        </div>

        <nav className="nav-links">
          <button className="nav-button">My Books</button>
          <button className="nav-button">Friends</button>
          <button className="nav-button primary">Log Out</button>
        </nav>
      </div>
    </header>
  );
}