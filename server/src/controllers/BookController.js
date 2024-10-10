const { Book } = require("../models");

module.exports = {
  // Get all books
  async index(req, res) {
    try {
      const books = await Book.findAll();
      res.send(books);
    } catch (err) {
      res.status(500).send({
        error: "The books information was incorrect",
      });
    }
  },
  // Create a new book
  async create(req, res) {
    try {
      const { title, author, category, status, isbn } = req.body;
      console.log("Received data:", { title, author, category, status, isbn });

      if (!title || !author || !category || !status || !isbn) {
        return res.status(400).send({ error: "Missing required fields" });
      }

      const newBook = await Book.create({
        title,
        author,
        category,
        isbn,
        status,
      });

      res.status(201).json(newBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).send({
        error: "An error occurred while creating the book.",
        details: error.message,
      });
    }
  },
  // Edit book, update status or other details
  async put(req, res) {
    try {
      await Book.update(req.body, {
        where: {
          isbn: req.params.bookIsbn,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "Update book incorrect",
      });
    }
  },
  // Delete a book
  async remove(req, res) {
    try {
      const book = await Book.findOne({
        where: {
          isbn: req.params.bookIsbn,
        },
      });
      if (!book) {
        return res.status(403).send({
          error: "The book information was incorrect",
        });
      }
      await book.destroy();
      res.send(book);
    } catch (err) {
      res.status(500).send({
        error: "The book information was incorrect",
      });
    }
  },
  // Get book by ISBN
  async show(req, res) {
    try {
      const book = await Book.findOne({
        where: {
          isbn: req.params.bookIsbn,
        },
      });
      res.send(book);
    } catch (err) {
      res.status(500).send({
        error: "The book information was incorrect",
      });
    }
  },

  async updateStatus(req, res) {
    try {
      const { bookIsbn } = req.params;
      const { status } = req.body; // รับค่า status จาก request body

      // ค้นหาหนังสือตาม ISBN
      const book = await Book.findOne({ where: { isbn: bookIsbn } });

      if (!book) {
        return res.status(404).send({
          error: "Book not found",
        });
      }

      // อัปเดตสถานะ
      book.status = status;
      await book.save();

      res.send({
        message: "Book status updated successfully",
        book,
      });
    } catch (err) {
      res.status(500).send({
        error: "An error occurred while updating the book status",
      });
    }
  },
};
