<template>
  <div class="signup-container">
    <h1 class="title">Create Your Account</h1>
    <form class="signup-form" v-on:submit.prevent="createUser">
      <div class="form-group">
        <label for="name">First Name</label>
        <input
          id="name"
          type="text"
          v-model="user.name"
          placeholder="Enter your first name"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          v-model="user.lastname"
          placeholder="Enter your last name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          type="email"
          v-model="user.email"
          placeholder="Enter your email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="user.password"
          placeholder="Create a password"
        />
      </div>
      <button class="signup-button" type="submit">Sign Up</button>
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
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push("/login");
      } catch (err) {
        console.error("Error creating user:", err);
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.signup-form {
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
}

.form-group input {
  width: 100%; /* Ensure there's padding */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: auto; /* Align input content properly */
  box-sizing: border-box; /* Include padding in width calculation */
}

.signup-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.signup-button:hover {
  background-color: #45a049;
}
</style>
