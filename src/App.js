import { useState, useEffect } from "react";
import { AddBookForm } from "./components/AddBookForm";
import { BookList } from "./components/BookList";
import { Header } from "./components/Header";
import { FriendList } from "./components/FriendList";
import { Home } from "./components/Home";
import {
  fetchBooks,
  addBook,
  updateBookStatus,
  deleteSelectedBook,
} from "./api";
import "./styles/Index.css";
import { AddFriendForm } from "./components/AddFriendForm";

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
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  async function handleBookStatusChange(id, e) {
    const newState = Number(e.target.value);

    try {
      await updateBookStatus(id, newState);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, read: newState } : book
        )
      );
      console.log(newState);
    } catch (error) {
      console.error("handleBookStatusChange -> error", error);
    }
  }

  function handleFilterBooks(e) {
    setSelectStatus(e.target.value);
  }

  async function handleDeleteBook(id) {
    try {
      const deleteBook = await deleteSelectedBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("handleDeleteBook -> error", error);
    }
  }

  function onLoggedIn(e) {
    setLoggedInUser(e.target.value);
  }

  return (
    <div className="App">
      {loggedInUser ? (
        <>
          <Header />
          <AddBookForm onAddBook={onAddBook} />
          <BookList
            books={books}
            status={selectStatus}
            onBookStatusChange={handleBookStatusChange}
            onFilterBooks={handleFilterBooks}
            onDeleteBook={handleDeleteBook}
          />
          <AddFriendForm />
          <FriendList friends={friends} />
        </>
      ) : (
        <Home loggedIn={onLoggedIn} />
      )}
    </div>
  );
}
