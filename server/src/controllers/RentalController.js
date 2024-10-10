const { Rental, User, Book } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const rentals = await Rental.findAll({
        include: [
          { model: User, as: "user" },
          { model: Book, as: "book" },
        ],
      });
      res.send(rentals);
    } catch (err) {
      res.status(500).send({
        error: "The rentals information was incorrect",
      });
    }
  },

  async create(req, res) {
    try {
      const { bookIsbn, userId, rentalDate, returnDate } = req.body;

      // ตรวจสอบว่าทุกฟิลด์ที่จำเป็นมีการส่งมาหรือไม่
      if (!bookIsbn || !userId || !rentalDate || !returnDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // หากข้อมูลครบถ้วนแล้ว ให้ทำการบันทึกการเช่าหนังสือ
      const rental = await Rental.create({
        bookIsbn,
        userId,
        rentalDate,
        returnDate,
      });

      res.status(201).json(rental);
    } catch (error) {
      console.error("Error creating rental:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  async update(req, res) {
    try {
      const { rentalDate, returnDate, status } = req.body;
      const rental = await Rental.update(
        { rentalDate, returnDate, status },
        { where: { id: req.params.rentalId } }
      );
      if (!rental[0]) {
        return res.status(404).send({ error: "Rental not found" });
      }
      res.send({ message: "Rental updated successfully" });
    } catch (err) {
      console.error("Error updating rental:", err);
      res.status(500).send({ error: "Update rental incorrect" });
    }
  },

  async remove(req, res) {
    try {
      const rental = await Rental.findOne({
        where: { id: req.params.rentalId },
      });
      if (!rental) {
        return res.status(404).send({ error: "Rental not found" });
      }
      await rental.destroy();
      res.send({ message: "Rental deleted successfully" });
    } catch (err) {
      console.error("Error deleting rental:", err);
      res.status(500).send({ error: "The rental information was incorrect" });
    }
  },

  async show(req, res) {
    try {
      const rental = await Rental.findByPk(req.params.rentalId, {
        include: [
          { model: User, as: "user" },
          { model: Book, as: "book" },
        ],
      });
      if (!rental) {
        return res.status(404).send({ error: "Rental not found" });
      }
      res.send(rental);
    } catch (err) {
      console.error("Error fetching rental:", err);
      res.status(500).send({ error: "The rental information was incorrect" });
    }
  },
  async updateStatus(req, res) {
    try {
      const rental = await Rental.findOne({
        where: { id: req.params.rentalId },
      });
      if (!rental) {
        return res.status(404).send({ error: "Rental not found" });
      }
      // เปลี่ยนสถานะของ rental เป็น 'Returned'
      rental.status = "Returned";
      await rental.save();
  
      // อัปเดตสถานะของหนังสือที่เกี่ยวข้องเป็น 'Available'
      const book = await Book.findOne({
        where: { isbn: rental.bookIsbn },
      });
      if (book) {
        book.status = "Available";
        await book.save();
      }
  
      res.send({ message: "Rental and Book status updated successfully" });
    } catch (error) {
      console.error("Error updating rental status:", error);
      res.status(500).send({ error: "Update status failed" });
    }
  },  
};
