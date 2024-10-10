<template>
  <div>
    <div class="nv-navbar">
      <div class="navbar-title">
        <h1>LibraryHub</h1>
      </div>
      <div class="nav-center">
        <ul class="nav">
          <li><router-link :to="{ name: 'books' }">Book</router-link></li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'rentals' }">Rental</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'users' }">Manage User</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-right">
        <ul class="nav">
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'user-create' }">Sign Up</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">Login</router-link>
          </li>
          <li v-if="isLoggedIn" class="user-info">
            <span>{{ user.name }}</span>
          </li>
          <li v-if="isLoggedIn">
            <a v-on:click.prevent="logout" href="#" class="logout-link"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.token != null;
    },
    user() {
      return this.$store.state.user ? this.$store.state.user : {};
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.nv-navbar {
  background-color: #f9f9f9;
  width: 100%;
  padding: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
}

.navbar-title {
  padding-left: 20px;
}

.navbar-title h1 {
  font-size: 1.8em;
  margin: 0;
  color: #343a40;
}

.nav-center {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.nv-navbar .nav li {
  margin-left: 20px;
}

.nv-navbar .nav li a {
  padding: 10px 15px;
  text-decoration: none;
  color: #343a40;
  font-weight: bold;
  font-size: 1.1em;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
}

.nv-navbar .nav li a:hover {
  background-color: #28a745;
  color: white;
}

.nv-navbar .nav li a.router-link-active {
  background-color: #007bff;
  color: white;
}

.nv-navbar .nav li span {
  font-size: 1.1em;
  color: #495057;
  font-weight: bold;
  opacity: 0.75;
}

.logout-link {
  color: #dc3545;
  cursor: pointer;
  padding: 10px 15px;
  font-weight: bold;
}

.logout-link:hover {
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
}
</style>
