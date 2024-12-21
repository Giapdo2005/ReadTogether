const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/book.model.js");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.post("/api/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cleanedId = id.trim();
    const { read } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      cleanedId,
      { read: read },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Can't find book" });
  }
});

mongoose
  .connect(
    "mongodb+srv://giapdo2005:fGjVK0OVkarSpUP7@backendreadtogether.czwke.mongodb.net/readTogetherAPI?retryWrites=true&w=majority&appName=backendReadTogether"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
