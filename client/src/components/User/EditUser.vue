<template>
  <div class="edit-user-container">
    <h1>Edit User</h1>

    <!-- Form to edit user details -->
    <form v-on:submit.prevent="editUser" class="edit-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          placeholder="Enter name"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input
          type="text"
          id="lastname"
          v-model="user.lastname"
          placeholder="Enter lastname"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Enter password"
          required
        />
      </div>

      <!-- Action buttons: Edit and Back -->
      <div class="action-buttons">
        <button type="submit" class="edit-btn">Edit User</button>
        <button type="button" @click="goBack" class="back-btn">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from "../../services/UsersService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push("/users");
      } catch (err) {
        console.log(err);
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style scoped>
.edit-user-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #007bff;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.edit-btn,
.back-btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #45a049;
}

.back-btn {
  background-color: #007bff;
  color: white;
  border: none;
}

.back-btn:hover {
  background-color: #0056b3;
}
</style>
