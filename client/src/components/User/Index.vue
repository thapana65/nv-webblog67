<template>
  <div class="users-list">
    <h1>Users List</h1>

    <div v-if="loading" class="loading-message">Loading users...</div>

    <div v-if="users.length">
      <div><b>Total Users:</b> {{ users.length }}</div>
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-info">
          <div><b>ID:</b> {{ user.id }}</div>
          <div><b>Name:</b> {{ user.name }} {{ user.lastname }}</div>
          <div><b>Email:</b> {{ user.email }}</div>
          <div><b>Status:</b> {{ user.status }}</div>
          <div><b>Type:</b> {{ user.type }}</div>
        </div>

        <div class="user-actions">
          <button
            @click="navigateTo('/user/' + user.id)"
            class="btn btn-primary"
          >
            View Details
          </button>
          <button
            @click="navigateTo('/user/edit/' + user.id)"
            class="btn btn-warning"
          >
            Edit Info
          </button>
          <button @click="deleteUser(user)" class="btn btn-danger">
            Delete
          </button>
        </div>
        <!-- <hr /> -->
      </div>
    </div>

    <div v-else>
      <p>No users available.</p>
    </div>

    <!-- Logout Button (optional, you can uncomment if needed) -->
    <!-- <div><button @click="logout" class="btn btn-secondary">Logout</button></div> -->
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await UsersService.index();
      this.users = response.data;
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({ name: "login" });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("Are you sure you want to delete this user?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.error("Error deleting user:", err);
        }
      }
    },
    async refreshData() {
      this.loading = true;
      try {
        const response = await UsersService.index();
        this.users = response.data;
      } catch (err) {
        console.error("Error refreshing user list:", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.users-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.loading-message {
  font-size: 18px;
  color: #999;
  text-align: center;
  padding: 20px;
}

.user-card {
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.user-info {
  margin-bottom: 15px;
}

.user-info b {
  color: #333;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.user-actions .btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.user-actions .btn-primary {
  background-color: #007bff;
  color: white;
}

.user-actions .btn-primary:hover {
  background-color: #0056b3;
}

.user-actions .btn-warning {
  background-color: #ffc107;
  color: white;
}

.user-actions .btn-warning:hover {
  background-color: #e0a800;
}

.user-actions .btn-danger {
  background-color: #dc3545;
  color: white;
}

.user-actions .btn-danger:hover {
  background-color: #c82333;
}

hr {
  margin: 20px 0;
}
</style>
