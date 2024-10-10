const UserController = require("./controllers/UserController");
const UserAuthenController = require("./controllers/UserAuthenController");
const isAuthenController = require("./authen/isAuthenController");
const BlogController = require("./controllers/BlogController");
const BookController = require("./controllers/BookController");
const RentalController = require("./controllers/RentalController");

let multer = require("multer");

// upload section
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    // callback(null, file.fieldname + '-' + Date.now());
    console.log("File details:", file);  // ตรวจสอบว่าไฟล์ถูกส่งมาหรือไม่
    callback(null, file.originalname);
  },
});
let upload = multer({ storage: storage }).array("userPhoto", 10);

module.exports = (app) => {
  app.get("/users", isAuthenController, UserController.index);
  app.get("/user/:userId", UserController.show);
  app.post("/user", UserController.create);
  app.put("/user/:userId", UserController.put);
  app.delete("/user/:userId", UserController.remove);
  app.post("/login", UserAuthenController.login);
  app.post("/blog", BlogController.create);
  app.put("/blog/:blogId", BlogController.put);
  app.delete("/blog/:blogId", BlogController.remove);
  app.get("/blog/:blogId", BlogController.show);
  app.get("/blogs", BlogController.index);

  // Book Routes
  app.get("/books", BookController.index); // Get all books
  app.post("/book", upload, BookController.create); // Handle image upload
  app.put("/book/:bookIsbn", BookController.put); // Update a book by ISBN
  app.delete("/book/:bookIsbn", BookController.remove); // Delete a book by ISBN
  app.get("/book/:bookIsbn", BookController.show); // Get a book by ISBN
  app.put("/book/:bookIsbn/status", BookController.updateStatus);

  // Rental Routes
  app.get("/rentals", RentalController.index);
  app.post("/rental", RentalController.create);
  app.put("/rental/:rentalId", RentalController.update);
  app.delete("/rental/:rentalId", RentalController.remove);
  app.get("/rental/:rentalId", RentalController.show);
  app.put("/rental/:rentalId/return", RentalController.updateStatus);

  // upload
  app.post("/upload", function (req, res) {
    // isUserAuthenticated,
    upload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
    });
  }),
    //delete file uploaded function
    app.post("/upload/delete", async function (req, res) {
      try {
        const fs = require("fs");
        console.log(req.body.filename);

        fs.unlink(
          process.cwd() + "/public/uploads/" + req.body.filename,
          (err) => {
            if (err) throw err;
            res.send("Delete sucessful");
            // console.log('successfully deleted material file');
          }
        );
      } catch (err) {
        res.status(500).send({
          error: "An error has occured trying to delete file the material",
        });
      }
    });
};
