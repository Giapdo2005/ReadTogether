import { set } from "lodash";
import { useState } from "react";
import { AddBookForm } from "./AddBookForm";
import { BookList } from "./BookList";
import { Header } from "./Header";
import { FriendList } from "./FriendList";
import "./styles/Index.css";

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    publishedYear: 1925,
    author: "F. Scott Fitzgerald",
    theme: "Modernist",
    read: 0,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    publishedYear: 1960,
    author: "Harper Lee",
    theme: "Southern Gothic",
    read: 0,
  },
  {
    id: 3,
    title: "1984",
    publishedYear: 1949,
    author: "George Orwell",
    theme: "Dystopian",
    read: 0,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    publishedYear: 1813,
    author: "Jane Austen",
    theme: "Romantic",
    read: 0,
  },
];

const initialFriends = [
  {
    name: "John Doe",
    age: 25,
    booksRead: ["The Great Gatsby", "To Kill a Mockingbird"],
  },
  {
    name: "Jane Doe",
    age: 24,
    booksRead: ["Pride and Prejudice"],
  },
  {
    name: "Paul Doe",
    age: 30,
    booksRead: ["1984", "Mice and Men"],
  },
];

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [friends, setFriends] = useState(initialFriends);
  const [selectStatus, setSelectStatus] = useState("all");
  const length = books.length;

  function onAddBook(newBook) {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  }

  function onStatusChange(e) {
    setSelectStatus(e.target.value);
  }

  function handleBookStatusChange(id, e) {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, read: Number(e.target.value) } : book
      )
    );
  }

  function handleFilterBooks(e) {
    setSelectStatus(e.target.value);
  }

  return (
    <div className="App">
      <Header />
      <AddBookForm onAddBook={onAddBook} />
      <BookList
        books={books}
        length={length}
        status={selectStatus}
        onStatusChange={onStatusChange}
        onBookStatusChange={handleBookStatusChange}
        onFilterBooks={handleFilterBooks}
      />
      <FriendList friends={friends} />
    </div>
  );
}
