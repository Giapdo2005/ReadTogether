const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/book.model.js");
const User = require("./models/user.model.js");
const e = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// create a new user
app.post("/api/users/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if all fields are filled
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check for existing email (separate check)
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" }, newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login route
app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if user is in the database
    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // loggedIn successfully
    res.json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return "Login failed";
  }
});

// get all books in database
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

//get a book according to id
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

//Deleting a book from the database
app.delete("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cleanedId = id.trim();
    const deletedBook = await Book.findByIdAndDelete(cleanedId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
