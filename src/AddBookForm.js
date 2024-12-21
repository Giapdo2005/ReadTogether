import { useState } from "react";
import "./styles/AddBookForm.css";

export function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");

  function handleAddBook(e) {
    e.preventDefault();

    if (!title || !publishedYear || !author) return;

    const newBook = {
      title: title,
      publishedYear: publishedYear,
      author: author,
      theme: theme
    };

    onAddBook(newBook);
    setTitle("");
    setPublishedYear("");
    setAuthor("");
    setTheme("");
  }

  return (
    <form className="add-book-form" onSubmit={handleAddBook}>
      <h2 className="form-title">Add a New Book</h2>
      <div className="form-group">
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Enter book title"
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          placeholder="Enter author name"
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Published Year</label>
        <input
          id="year"
          type="number"
          value={publishedYear}
          placeholder="Enter published year"
          onChange={(e) => setPublishedYear(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="theme">Theme</label>
        <input
          id="theme"
          type="text"
          value={theme}
          placeholder="Enter Theme"
          onChange={(e) => setTheme(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        Add Book
      </button>
    </form>
  );
}
