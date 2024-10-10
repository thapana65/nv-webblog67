<template>
  <div class="user-profile">
    <h1 class="title">Show User</h1>

    <!-- User details if data is loaded successfully -->
    <div v-if="!loading && !errorMessage" class="user-details">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Lastname:</strong> {{ user.lastname }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
      <p><strong>Type:</strong> {{ user.type }}</p>
      <p>
        <strong>Created At:</strong>
        {{ new Date(user.createdAt).toLocaleString() }}
      </p>
    </div>

    <!-- Loading and error state handling -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Action buttons - Back, Edit, Delete -->
    <div class="action-buttons">
      <button @click="goBack" class="back-btn">Back</button>
      <button @click="editUser" class="edit-btn">Edit</button>
      <button @click="deleteUser" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}, // To store user data
      loading: true, // To track loading state
      errorMessage: null, // To store error messages
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      const response = await UsersService.show(userId);
      this.user = response.data;
    } catch (err) {
      this.errorMessage = "Failed to load user data. Please try again later.";
      console.error(err);
    } finally {
      this.loading = false; // Set loading to false once data is loaded or error occurs
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
    editUser() {
      // Redirect to the edit page with user ID
      this.$router.push({ name: "user-edit", params: { userId: this.user.id } });
    },
    async deleteUser() {
      const confirmation = confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmation) {
        try {
          await UsersService.delete(this.user.id); // Call delete method in UsersService
          this.$router.push({ name: "users" }); // Redirect to the users list after deletion
        } catch (err) {
          this.errorMessage = "Failed to delete user. Please try again later.";
          console.error(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.user-details p {
  margin-bottom: 10px;
  font-size: 16px;
}

.user-details p strong {
  font-weight: bold;
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-btn,
.edit-btn,
.delete-btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 30%;
}

.back-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.back-btn:hover {
  background-color: #0056b3;
}

.edit-btn {
  background-color: #ffa500;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #e69500;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
