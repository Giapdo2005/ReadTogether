import { useState } from "react";
import "./styles/Book.css";

export function Book({
  id,
  title,
  year,
  author,
  theme,
  onBookStatusChange,
  read,
}) {
  const statusStyles = {
    0: "status-not-started",
    1: "status-reading",
    2: "status-finished",
  };

  return (
    <li className="book-card">
      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <div className="book-details">
          <p className="book-author">
            <span className="label">Author:</span> {author}
          </p>
          <p className="book-year">
            <span className="label">Year:</span> {year}
          </p>
          {theme && (
            <p className="book-theme">
              <span className="label">Theme:</span> {theme}
            </p>
          )}
        </div>
      </div>
      <div className="book-status">
        <select
          className={`book-status-select ${statusStyles[read]}`}
          onChange={onBookStatusChange}
        >
          <option value="0">Haven't Started</option>
          <option value="1">In Progress</option>
          <option value="2">Finished</option>
        </select>
      </div>
    </li>
  );
}