<template>
  <div class="hello">
    <label><input type="checkbox" v-model="product"> </label>
    <label><input type="checkbox" v-model="calories"> </label>
    <label><input type="checkbox" v-model="fat"> </label>
    <label><input type="checkbox" v-model="carbs"> </label>
    <label><input type="checkbox" v-model="protein"> </label>
    <label><input type="checkbox" v-model="iron"> </label>
    <table>
      <tr>
        <th v-show="isVisible('product')">Product(100g serving)</th>
        <th v-show="isVisible('calories')">Calories</th>
        <th v-show="isVisible('fat')">Fat (g)</th>
        <th v-show="isVisible('carbs')">Carbs (g)</th>
        <th v-show="isVisible('protein')">Protein (g)</th>
        <th v-show="isVisible('iron')">Iron (%)</th>
      </tr>
      <tr v-for="items in products" v-bind:key="items.id">
        <td v-for="(item, key) in sortedList(items)" v-show="isVisible(key)" v-bind:class="{ first: isFirst(key) }"  v-bind:key="item.id">{{ item }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Table',

  data() {
    return {
      product: true,
      calories: true,
      fat: true,
      carbs: true,
      protein: true,
      iron: true
    }
  },

  computed: {
    ...mapState([
      'products'
    ]),
  },

  methods: {
    sortedList(list) {
      delete list.id;
      return list;
    },

    isVisible(key) {
      switch(key) {
        case 'product':
          return this.product;
        case 'calories':
          return this.calories;
        case 'fat':
          return this.fat;
        case 'carbs':
          return this.carbs;
        case 'protein':
          return this.protein;
        case 'iron':
          return this.iron;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
