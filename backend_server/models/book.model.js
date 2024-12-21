const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter book title"],
    trim: true,
  },
  publishedYear: {
    type: Number,
    required: [true, "Please enter published year"],
  },
  author: {
    type: String,
    required: [true, "Please enter author"],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, "Please enter genre"],
    trim: true,
  },
  read: {
    type: Number,
    default: 0,
    enum: [0, 1, 2], // 0: not read, 1: reading, 2: read
  },
});

module.exports = mongoose.model("Book", BookSchema);
