import { set } from "lodash";
import { useState, useEffect } from "react";
import { AddBookForm } from "./AddBookForm";
import { BookList } from "./BookList";
import { Header } from "./Header";
import { FriendList } from "./FriendList";
import { fetchBooks, addBook, updateBookStatus } from "./api";
import "./styles/Index.css";

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
  const [books, setBooks] = useState([]);
  const [friends, setFriends] = useState(initialFriends);
  const [selectStatus, setSelectStatus] = useState("all");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("loadBooks -> error", error);
      }
    };

    loadBooks();
  }, []);

  async function onAddBook(newBook) {
    try {
      const addedBook = await addBook(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("onAddBook -> error", error);
    }
  }

  function onStatusChange(e) {
    setSelectStatus(e.target.value);
  }

  async function handleBookStatusChange(id, e) {
    const newState = Number(e.target.value);

    try {
      const updatedBook = updateBookStatus(id, newState);

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, read: newState } : book
        )
      );
    } catch (error) {
      console.error("handleBookStatusChange -> error", error);
    }
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
        status={selectStatus}
        onStatusChange={onStatusChange}
        onBookStatusChange={handleBookStatusChange}
        onFilterBooks={handleFilterBooks}
      />
      <FriendList friends={friends} />
    </div>
  );
}
