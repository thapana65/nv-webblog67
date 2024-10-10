<template>
  <div class="rent-book-container">
    <h1>Rent a Book</h1>

    <form @submit.prevent="rentBook" class="rental-form">
      <!-- Hidden Fields for bookIsbn and userId -->
      <input type="hidden" v-model="rental.bookIsbn" />
      <input type="hidden" v-model="rental.userId" />

      <!-- Book Title Display (Disabled Input) -->
      <div class="form-group">
        <label for="bookTitle">Book Title:</label>
        <input
          type="text"
          v-model="rental.book.title"
          disabled
          class="form-control"
        />
      </div>

      <!-- Book ISBN Display (Disabled Input) -->
      <div class="form-group">
        <label for="bookIsbn">Book ISBN:</label>
        <input
          type="text"
          v-model="rental.book.isbn"
          disabled
          class="form-control"
        />
      </div>

      <!-- Rental Date Input -->
      <div class="form-group">
        <label for="rentalDate">Rental Date:</label>
        <input
          type="date"
          v-model="rental.rentalDate"
          required
          class="form-control"
        />
      </div>

      <!-- Return Date Input -->
      <div class="form-group">
        <label for="returnDate">Return Date:</label>
        <input
          type="date"
          v-model="rental.returnDate"
          required
          class="form-control"
        />
      </div>

      <!-- Rent Button -->
      <button type="submit" class="btn btn-primary">Rent Book</button>
    </form>
  </div>
</template>

<script>
import RentalService from "@/services/RentalService";
import BookService from "@/services/BookService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      rental: {
        bookIsbn: this.$route.params.bookIsbn, // Use bookIsbn from route params
        userId: this.$route.params.userId, // Get userId from route params
        rentalDate: "",
        returnDate: "",
        book: {
          title: "", // Book title
          isbn: "", // Book ISBN
        },
      },
      errorMessage: "", // To store error messages
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isUserLoggedIn, // Check login status
    }),
  },
  watch: {
    // If bookIsbn changes, fetch the book title again
    "$route.params.bookIsbn": "fetchBookTitle",
  },
  created() {
    // Fetch the book title when the component is created
    this.fetchBookTitle();
  },
  methods: {
    async fetchBookTitle() {
      try {
        const response = await BookService.show(this.rental.bookIsbn); // Fetch using bookIsbn
        if (response && response.data) {
          this.rental.book.title = response.data.title; // Set book title
          this.rental.book.isbn = response.data.isbn; // Set book ISBN
        } else {
          console.error("Book details not found");
          this.rental.book.title = "Unknown Book Title"; // Fallback
          this.rental.book.isbn = "Unknown ISBN"; // Fallback
        }
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        this.rental.book.title = "Error fetching title";
        this.rental.book.isbn = "Error fetching ISBN";
      }
    },

    async rentBook() {
      // Check if user is logged in
      if (!this.isLoggedIn) {
        alert("Please log in first.");
        return;
      }

      // Validation: Ensure all required fields are filled
      if (
        !this.rental.bookIsbn ||
        !this.rental.userId ||
        !this.rental.rentalDate ||
        !this.rental.returnDate
      ) {
        alert("Please fill in all fields.");
        return;
      }

      // Validation: Ensure returnDate is after rentalDate
      const rentalDate = new Date(this.rental.rentalDate);
      const returnDate = new Date(this.rental.returnDate);

      if (returnDate <= rentalDate) {
        alert("Return date must be after rental date.");
        return;
      }

      // Create rental data object
      const rentalData = {
        bookIsbn: this.rental.bookIsbn, // Use bookIsbn
        userId: this.rental.userId,
        rentalDate: this.rental.rentalDate,
        returnDate: this.rental.returnDate,
      };

      console.log("Rental Data:", rentalData);

      try {
        // Send rental data to API
        const response = await RentalService.post(rentalData);
        console.log("Response:", response);

        // On success, update book status to "Rented"
        await BookService.updateStatus(this.rental.bookIsbn, "Rented"); // Update book status to "Rented"

        // Show success message and navigate to rentals index
        alert("Book rented successfully");
        this.$router.push({ name: "rentals" });
      } catch (error) {
        console.error("Failed to rent the book:", error);

        // Handle API errors
        this.errorMessage = error.response
          ? error.response.data.message || error.response.data
          : "Failed to rent the book";

        alert(this.errorMessage);
      }
    },
  },
};
</script>

<style scoped>
/* Container for centering the form */
.rent-book-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Styling for form elements */
.rental-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
