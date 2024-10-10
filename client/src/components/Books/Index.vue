<template>
  <div class="container">
    <div class="header">
      <h1>Book List</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search books..."
          @input="filterBooks"
          class="search-input"
        />
        <select
          v-model="selectedCategory"
          @change="filterBooks"
          class="category-dropdown"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
        </select>
      </div>
      <button @click="addBook" v-if="isLoggedIn" class="add-book-btn">
        Add Book
      </button>
    </div>

    <div class="book-grid">
      <div
        class="book-card"
        v-for="(book, index) in filteredBooks"
        :key="book.isbn"
      >
        <h3>{{ book.title }}</h3>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Category:</strong> {{ book.category }}</p>
        <p>
          <strong>Status:</strong>
          {{ book.status === "Rented" ? "Rented" : "Available" }}
        </p>

        <div v-if="isLoggedIn" class="actions">
          <button @click="viewBook(book.isbn)" class="btn">View</button>
          <button @click="editBook(book.isbn)" class="btn">Edit</button>
          <button @click="deleteBook(book.isbn)" class="btn delete-btn">
            Delete
          </button>
          <button
            v-if="book.status !== 'Rented'"
            @click="rentBook(book)"
            class="btn rent-btn"
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "@/services/BookService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      books: [], // Book data
      searchQuery: "", // For search input
      selectedCategory: "", // For category filter
      filteredBooks: [], // Filtered list based on search
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isUserLoggedIn, // Check if the user is logged in via Vuex
      userId: (state) => (state.user ? state.user.id : null), // Get the user ID from Vuex
    }),
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await BookService.index();
        this.books = response.data;
        this.filteredBooks = this.books; // Set the initial filteredBooks to all books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    filterBooks() {
      let filtered = this.books;

      if (this.searchQuery.trim()) {
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter((book) => {
          return (
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower) ||
            book.category.toLowerCase().includes(searchLower) ||
            book.status.toLowerCase().includes(searchLower)
          );
        });
      }

      if (this.selectedCategory) {
        filtered = filtered.filter((book) =>
          book.category
            .toLowerCase()
            .includes(this.selectedCategory.toLowerCase())
        );
      }

      this.filteredBooks = filtered;
    },
    viewBook(isbn) {
      this.$router.push({ name: "book", params: { isbn } });
    },
    editBook(isbn) {
      this.$router.push({ name: "book-edit", params: { isbn } });
    },
    addBook() {
      this.$router.push({ name: "book-create" });
    },
    async deleteBook(isbn) {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await BookService.delete(isbn);
          this.fetchBooks();
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    },
    async rentBook(book) {
      if (!this.userId) {
        alert("Please log in first.");
        return;
      }

      this.$router.push({
        name: "rental-create",
        params: {
          bookIsbn: book.isbn,
          userId: this.userId,
        },
      });
    },
  },
  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 20px;
}

h1 {
  font-size: 2em;
  color: #343a40;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.search-input {
  padding: 8px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 200px;
}

.category-dropdown {
  padding: 8px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 20px; /* เพิ่มระยะห่างจากปุ่ม Add Book */
}

.add-book-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-book-btn:hover {
  background-color: #0056b3;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  justify-items: center;
}

.book-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  transition: transform 0.3s ease;
}

.book-card:hover {
  transform: scale(1.05);
}

.book-card h3 {
  font-size: 1.4em;
  color: #343a40;
}

.book-card p {
  font-size: 0.9em;
  color: #555;
  margin: 10px 0;
}

.actions {
  margin-top: 15px;
}

.btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.rent-btn {
  background-color: #17a2b8;
}

.rent-btn:hover {
  background-color: #138496;
}
</style>
