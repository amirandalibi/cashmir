<template>
  <div>
    <form ref="loginForm" v-on:submit.prevent="submitForm">
      <fieldset>
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="password" v-model="password" required>
        </div>
        <label for="keepLoggedIn">Keep me logged in</label>
        <input type="checkbox" name="keepLoggedIn">
        <div>
          <button type="submit">Login</button>
        </div>
      </fieldset>
    </form>
    <p>Don't have an account? <router-link :to="{ name: 'registerForm' }">register</router-link> here</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    submitForm() {
      fetch('/login', {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          this.$router.push({ name: 'dashboard' });
        }
      });
    }
  }
}
</script>
