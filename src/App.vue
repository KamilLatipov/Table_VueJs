<template>
  <div id="app">
    <Table msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Table
  },

  data() {
    return {
      columns: {
        list: []
      }
    }
  },

  mounted() {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
