export function Friend({ name, age, booksRead }) {
  return (
    <div className="friend-card">
      <div className="friend-header">
        <h3 className="friend-name">{name}</h3>
        <span className="friend-age">{age} years old</span>
      </div>
      <div className="friend-books">
        <h4 className="books-read-title">
          Books Read <span className="book-count">({booksRead.length})</span>
        </h4>
        <ul className="books-read-list">
          {booksRead.map((book) => (
            <li key={book} className="book-item">
              <span className="book-icon">📚</span>
              {book}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
