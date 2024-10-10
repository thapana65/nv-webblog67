<template>
  <div class="create-book-container">
    <h1>Create a New Book</h1>

    <form
      @submit.prevent="submitForm"
      class="create-book-form"
      enctype="multipart/form-data"
      novalidate
    >
      <!-- Title Input -->
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          v-model="book.title"
          id="title"
          required
          class="form-control"
          placeholder="Enter the book title"
        />
      </div>

      <!-- Author Input -->
      <div class="form-group">
        <label for="author">Author:</label>
        <input
          type="text"
          v-model="book.author"
          id="author"
          required
          class="form-control"
          placeholder="Enter the author's name"
        />
      </div>

      <!-- Category Dropdown -->
      <div class="form-group">
        <label for="category">Category:</label>
        <select
          v-model="book.category"
          id="category"
          required
          class="form-control"
        >
          <option value="" disabled>Select a category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <!-- Add more categories as needed -->
        </select>
      </div>

      <!-- ISBN (Generated) -->
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input
          type="text"
          v-model="book.isbn"
          id="isbn"
          readonly
          class="form-control"
        />
      </div>

      <!-- Submit and Back Buttons -->
      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">Create Book</button>
        <button @click="goBack" class="btn btn-secondary">Back to List</button>
      </div>
    </form>
  </div>
</template>

<script>
import BookService from "@/services/BookService"; // Adjust based on your service location

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        category: "",
        status: "Available", // Default status
        isbn: "", // To store generated ISBN
      },
    };
  },
  methods: {
    // Method to generate a random ISBN (for simplicity, using a basic version)
    generateISBN() {
      const prefix = "978"; // Common ISBN prefix for books
      const randomDigits = Math.floor(Math.random() * 1000000000); // Random 9 digits
      return `${prefix}-${randomDigits}`;
    },

    async submitForm() {
      try {
        // Generate ISBN before submitting the form
        this.book.isbn = this.generateISBN();

        // Create FormData object
        const formData = new FormData();
        formData.append("title", this.book.title);
        formData.append("author", this.book.author);
        formData.append("category", this.book.category);
        formData.append("status", this.book.status);
        formData.append("isbn", this.book.isbn);

        // Post the new book data to the BookService API
        await BookService.post(formData);

        // Redirect to the book list page after creation
        this.$router.push({ name: "books" });
      } catch (error) {
        console.error("Error creating book:", error);
        alert("Failed to create book. Please try again.");
      }
    },

    // Navigate back to the book list
    goBack() {
      this.$router.push({ name: "books" });
    },
  },
  created() {
    // Generate ISBN when the component is created, so it's available in the form
    this.book.isbn = this.generateISBN();
  },
};
</script>

<style scoped>
/* Styles for the CreateBook form */
.create-book-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.create-book-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.form-group {
  margin-bottom: 20px;
  width: 100%; /* Make sure the input spans the entire width of the container */
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%; /* Ensure both input and select fields are 100% width */
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease;
  box-sizing: border-box; /* Ensure padding and border are included in the width calculation */
}

.form-group select {
  -webkit-appearance: none; /* Removes default styling on select elements in Webkit browsers (Chrome, Safari) */
  -moz-appearance: none; /* Same for Firefox */
  appearance: none; /* Same for other browsers */
  background-color: #fff; /* Set background color */
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"%3E%3Cpath fill="none" stroke="%23ccc" stroke-width="1.5" d="M1 1l7 7 7-7"%3E%3C/path%3E%3C/svg%3E'); /* Adds a down arrow to the dropdown */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px; /* Adjust the arrow size */
  padding-right: 40px; /* Space for the arrow */
}

.form-control::placeholder {
  color: #888;
}

.btn {
  padding: 12px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  margin-left: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.mb-4 {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .create-book-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
