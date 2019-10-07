<template>
  <div class="container">
    <div>
      <h1 class="title">
        Nuxt Test page
      </h1>
      <logo />
      <h2 v-show="!$store.state.authUser" class="subtitle">
        Please login to see the secret content
      </h2>
      <form v-if="!$store.state.authUser" class="login-form" @submit.prevent="login">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
        <div class="login-element">
          <label for="login-username">Username:</label> <input id="login-username" v-model="formUsername" class="login-input" type="text" name="username">
        </div>
        <div class="login-element">
          <label for="login-password">Password:</label> <input id="login-password" v-model="formPassword" class="login-input" type="password" name="password">
        </div>
        <div class="login-element">
          <button class="button--green" type="submit">
            Login
          </button>
        </div>
      </form>
      <div v-else>
        <h2 class="subtitle">
          Hello {{ $store.state.authUser.username }}!
        </h2>
        <pre>I am the secret content, I am shown only when the user is connected.</pre>
        <p><i>You can also refresh this page, you'll still be connected!</i></p>
        <div class="button-list">
          <NuxtLink class="button--green" to="/secret">
            Super secret page
          </NuxtLink>
          <button class="button--grey" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.button-list{
  margin-top: 10px;
}
.button--green{
  background: rgb(255, 255, 255);
  font:inherit;
}
.button--grey{
  font:inherit;
  background: rgb(255, 255, 255);
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.login-input{
  display: inline-block;
    border-radius: 4px;
    border: 1px solid rgb(59, 128, 112);
    color: rgb(59, 128, 112);
    text-decoration: none;
    padding: 4px 21px;
}

.login-element{
    margin:10px 0 10px 0;
}

.links {
  padding-top: 15px;
}

.error {
  color: red;
}
</style>
