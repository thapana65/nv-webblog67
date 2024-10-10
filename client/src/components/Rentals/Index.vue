<template>
  <div>
    <div class="header">
      <h1>Rental List</h1>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Book</th>
          <th>Status</th>
          <th>Rental Date</th>
          <th>Return Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rental, index) in rentals" :key="rental.id">
          <td>{{ index + 1 }}</td>
          <td>
            {{
              rental.userId
                ? rental.user.name + " " + rental.user.lastname
                : "No User"
            }}
          </td>
          <td>{{ rental.bookIsbn ? rental.book.title : "No Book" }}</td>
          <td>{{ rental.status }}</td>
          <td>{{ formatDate(rental.rentalDate) }}</td>
          <td>{{ formatDate(rental.returnDate) }}</td>
          <td>
            <button @click="viewRental(rental.id)">View</button>
            <button
              v-if="rental.status === 'Borrowing'"
              @click="returnRental(rental.id)"
            >
              Return Book
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RentalService from "@/services/RentalService";
import moment from "moment";

export default {
  data() {
    return {
      rentals: [], // List of all rentals
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "No Date";
      return moment(date).format("DD-MM-YYYY"); // Format date as DD-MM-YYYY
    },
    // Fetch all rentals
    async fetchRentals() {
      try {
        const response = await RentalService.index(); // Use API service
        this.rentals = response.data; // Store fetched rentals data
      } catch (error) {
        console.error("Error fetching rentals:", error); // Handle errors
      }
    },
    // View rental details
    viewRental(rentalId) {
      this.$router.push({ name: "rental", params: { rentalId } });
    },
    // Return a book
    async returnRental(rentalId) {
      try {
        // Call service to mark rental as returned
        await RentalService.returnRental(rentalId);

        // Fetch the updated rental data
        const rental = this.rentals.find((r) => r.id === rentalId);
        rental.status = "Returned"; // Update rental status to Returned

        // Update the book status to Available
        await BookService.updateBookStatus(rental.bookIsbn, "Available");

        // Refresh rentals list to reflect changes
        this.fetchRentals();
      } catch (error) {
        console.error("Error returning book:", error);
      }
    },
  },
  created() {
    this.fetchRentals(); // Fetch rentals data when component is created
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
