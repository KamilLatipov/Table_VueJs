<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
    }
  },

  mounted() {
    this.$store.dispatch('getProducts')
            .catch((error => {
      this.$router.push('/error');
      console.log(error)
            })
            );
  }
}
</script>

<style lang="scss">

@import './assets/global';

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
