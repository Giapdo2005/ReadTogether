import { Book } from "./Book";
import "./styles/BookList.css";

export function BookList({
  books,
  onStatusChange,
  status,
  onBookStatusChange,
  bookStatus,
  onFilterBooks,
}) {
  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2 className="book-list-title">Giap's BookList</h2>
        <div className="filter-section">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            className="status-filter"
            value={status}
            onChange={onFilterBooks}
          >
            <option value="all">All Books</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>
      <div className="book-grid">
        {status === "all" &&
          books.map((book) => (
            <Book
              key={book._id}
              id={book._id}
              title={book.title}
              year={book.publishedYear}
              author={book.author}
              theme={book.genre}
              read={book.read}
              onBookStatusChange={(e) => onBookStatusChange(book._id, e)}
            />
          ))}
        {status === "reading" &&
          books
            .filter((book) => book.read === 1)
            .map((book) => (
              <Book
                key={book._id}
                id={book._id}
                title={book.title}
                year={book.publishedYear}
                author={book.author}
                theme={book.genre}
                read={book.read}
                onBookStatusChange={(e) => onBookStatusChange(book._id, e)}
              />
            ))}
        {status === "finished" &&
          books
            .filter((book) => book.read === 2)
            .map((book) => (
              <Book
                key={book._id}
                id={book._id}
                title={book.title}
                year={book.publishedYear}
                author={book.author}
                theme={book.genre}
                read={book.read}
                onBookStatusChange={(e) => onBookStatusChange(book._id, e)}
              />
            ))}
      </div>
    </div>
  );
}
