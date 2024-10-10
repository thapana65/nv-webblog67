<template>
  <div class="rental-details-container">
    <h1>Rental Details</h1>

    <div v-if="rental" class="rental-details">
      <div class="rental-info">
        <p>
          <strong>User:</strong> {{ rental.user.name }}
          {{ rental.user.lastname }}
        </p>
        <p><strong>Book:</strong> {{ rental.book.title }}</p>
        <p><strong>Status:</strong> {{ rental.status }}</p>
        <p><strong>Rental Date:</strong> {{ formatDate(rental.rentalDate) }}</p>
        <p><strong>Return Date:</strong> {{ formatDate(rental.returnDate) }}</p>
      </div>

      <div class="actions">
        <button class="btn back-btn" @click="goBack">Back</button>

        <button
          v-if="rental.status === 'Borrowing'"
          class="btn return-btn"
          @click="returnRental(rental.id)"
        >
          Return Book
        </button>
      </div>
    </div>

    <div v-else>
      <p>Loading rental details...</p>
    </div>
  </div>
</template>

<script>
import RentalService from "@/services/RentalService";
import BookService from "@/services/BookService";
import moment from "moment";

export default {
  data() {
    return {
      rental: null, // Store rental details
    };
  },
  methods: {
    // Format date in DD-MM-YYYY format
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    // Fetch rental details by rentalId
    async fetchRentalDetails(rentalId) {
      try {
        const response = await RentalService.show(rentalId);
        this.rental = response.data; // Store rental details in data
      } catch (error) {
        console.error("Error fetching rental details:", error);
      }
    },
    // Handle returning a book
    async returnRental(rentalId) {
      try {
        await RentalService.returnRental(rentalId); // Mark rental as returned
        this.rental.status = "Returned"; // Update the status locally

        // Update book status to available
        await BookService.updateBookStatus(this.rental.book.isbn, "Available");

        // Optionally, show a success message
        alert("Book returned successfully.");
      } catch (error) {
        console.error("Error returning book:", error);
      }
    },
    // Handle back navigation
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
  created() {
    const rentalId = this.$route.params.rentalId; // Get rentalId from route params
    this.fetchRentalDetails(rentalId); // Fetch rental details when component is created
  },
};
</script>

<style scoped>
.rental-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2em;
  color: #343a40;
  margin-bottom: 20px;
  text-align: center;
}

.rental-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.rental-info {
  margin-bottom: 20px;
}

.rental-info p {
  font-size: 1.1em;
  color: #555;
  margin: 10px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn {
  background-color: #6c757d;
  color: white;
}

.back-btn:hover {
  background-color: #5a6268;
}

.return-btn {
  background-color: #28a745;
  color: white;
}

.return-btn:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .rental-details-container {
    padding: 10px;
  }

  .rental-info p {
    font-size: 1em;
  }
}
</style>
