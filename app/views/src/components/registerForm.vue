<template>
  <div>
    <form ref="form" v-on:submit.prevent="submitForm">
      <div class="form_wrapper">
        <div>
          <label for="firtName">First Name</label>
          <input name="firstname" v-model="firstName" type="text" maxlength="20" required>
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input name="lastName" v-model="lastName" type="text" maxlength="20" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input name="email" v-model="email" type="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" v-model="password" type="password" required>
        </div>
        <div>
          <label for="Confirm Password">Confirm Password</label>
          <input name="confirmPassword" v-model="verify" type="password" :rules="[passwordMatch]" required>
        </div>
        <div class="button_wrapper">
          <button type="submit">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    errors: [],
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verify: '',
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    submitForm() {
      fetch("/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          this.$router.push('/login');
        }
      })
      .then(error => {
        throw Error(error);
      });
    }
  }
};
</script>
