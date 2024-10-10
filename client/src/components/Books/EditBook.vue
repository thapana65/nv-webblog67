<template>
  <div class="edit-book-container">
    <h1>Edit Book</h1>
    <form @submit.prevent="updateBook" class="edit-book-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="book.title" required />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" id="author" v-model="book.author" required />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="book.category" required>
          <option value="" disabled>Select a category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
        </select>
      </div>
      <div class="form-group">
        <label for="isbn">ISBN</label>
        <input type="text" id="isbn" v-model="book.isbn" required disabled />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="book.status" required>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <button @click="cancelEdit" type="button" class="btn btn-danger">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BookService from "@/services/BookService";

export default {
  data() {
    return {
      book: {
        id: null,
        title: "",
        author: "",
        category: "",
        isbn: "",
        status: "Available",
      },
    };
  },
  methods: {
    async fetchBook() {
      try {
        const response = await BookService.show(this.$route.params.isbn);
        if (response.data) {
          this.book = response.data;
        } else {
          console.error("No book found");
          this.$router.push({ name: "books" });
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        alert("Failed to fetch book details");
        this.$router.push({ name: "books" });
      }
    },
    async updateBook() {
      try {
        await BookService.put(this.book);
        this.$router.push({ name: "books" });
      } catch (error) {
        console.error("Error updating book:", error);
        alert("Failed to update book");
      }
    },
    cancelEdit() {
      if (confirm("Are you sure you want to cancel editing?")) {
        this.$router.push({ name: "books" });
      }
    },
  },
  created() {
    this.fetchBook();
  },
};
</script>

<style scoped>
/* Styles for the EditBook form */
.edit-book-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.edit-book-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  width: 100%;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

input[disabled] {
  background-color: #f0f0f0;
  cursor: not-allowed;
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

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 12px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #28a745;
  color: white;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .edit-book-form {
    gap: 15px;
  }

  .btn {
    padding: 10px 20px;
  }
}
</style>
