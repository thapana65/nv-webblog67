<template>
  <div class="container">
    <!-- Header with the back button -->
    <div class="header">
      <h1>Book Details</h1>
      <button @click="goBack" class="back-btn">Back to List</button>
    </div>

    <!-- Display book details if available -->
    <div v-if="book && !errorMessage" class="card">
      <div class="book-details">
        <p><strong>ISBN:</strong> {{ book.isbn }}</p>
        <p><strong>Title:</strong> {{ book.title }}</p>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Category:</strong> {{ book.category }}</p>
        <p>
          <strong>Status:</strong>
          {{ book.status === "Rented" ? "Rented" : "Available" }}
        </p>
      </div>

      <!-- Show edit and delete buttons only if the user is logged in -->
      <div v-if="isLoggedIn" class="action-buttons">
        <button @click="editBook(book.isbn)" class="edit-btn">Edit</button>
        <button @click="deleteBook(book.isbn)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>

    <!-- Loading state while fetching the book details -->
    <div v-else-if="!book && !errorMessage">
      <p>Loading book details...</p>
    </div>

    <!-- Error message if book details failed to load -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookService from "@/services/BookService";

export default {
  data() {
    return {
      book: null, // Book details will be stored here
      errorMessage: "", // Error message for failed fetch or delete
    };
  },
  computed: {
    // Use Vuex to check if the user is logged in
    ...mapState({
      isLoggedIn: (state) => state.token != null, // Check if token exists in Vuex store
    }),
  },
  methods: {
    // Fetch book details using BookService based on ISBN
    async fetchBook() {
      try {
        const response = await BookService.show(this.$route.params.isbn);
        this.book = response.data;
      } catch (error) {
        console.error("Error fetching book:", error);
        this.errorMessage =
          "Failed to load book details. Please try again later.";
      }
    },

    // Navigate back to the book list
    goBack() {
      this.$router.push({ name: "books" });
    },

    // Navigate to the edit page of the book
    editBook(isbn) {
      this.$router.push({ name: "book-edit", params: { isbn } });
    },

    // Delete the book if confirmed by the user
    async deleteBook(isbn) {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await BookService.delete(isbn);
          this.$router.push({ name: "books" });
        } catch (error) {
          console.error("Error deleting book:", error);
          this.errorMessage = "Failed to delete book. Please try again later.";
        }
      }
    },
  },
  created() {
    // Fetch the book details when the component is created
    this.fetchBook();
  },
};
</script>

<style scoped>
/* Centering the entire content */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 100vh; /* Full height of the viewport */
  padding-top: 10px; /* Adjust padding for less space at the top */
}

/* Styling for the header */
.header {
  display: flex;
  justify-content: space-between; /* Align the header items (title and button) */
  align-items: center; /* Vertically center the items */
  width: 100%;
  max-width: 1200px; /* Optional max-width for the header */
  margin-bottom: 10px; /* Reduced space between header and card */
}

/* Styling for buttons */
button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styling for Edit button */
.edit-btn {
  background-color: #ffc107; /* Warning color */
  color: white;
}

.edit-btn:hover {
  background-color: #e0a800;
}

/* Styling for Delete button */
.delete-btn {
  background-color: #dc3545; /* Dangerous color */
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Styling for error message */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 20px;
}

/* Card styling for the book details */
.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* Limit the card width */
  width: 100%;
}

/* Styling for the title */
h1 {
  font-size: 24px;
}

/* Add some margin to book details */
.book-details {
  margin-bottom: 20px;
}

/* Add some spacing between buttons */
.action-buttons {
  margin-top: 10px;
}

/* Styling for the Back button */
.back-btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #0056b3;
}
</style>
