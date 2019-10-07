<template>
  <div class="container">
    <h1 class="title small-title">
      Super secret page
    </h1>
    <Logo />
    <p class="explanation-text">
      If you try to access this URL not connected, you will see the error page telling your that you are not connected.
    </p>
    <NuxtLink class="button--green" to="/">
      Back to the home page
    </NuxtLink>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'auth',

  components: {
    Logo
  }
}
</script>

<style>
.container{
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.small-title{
  font-size:60px;
}
.explanation-text{
margin: 10px 0;
}
</style>
