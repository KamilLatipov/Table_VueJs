<template>
  <div class="hello">
    <div>
      <label><input type="checkbox" v-model="product"> </label>
      <label><input type="checkbox" v-model="calories"> </label>
      <label><input type="checkbox" v-model="fat"> </label>
      <label><input type="checkbox" v-model="carbs"> </label>
      <label><input type="checkbox" v-model="protein"> </label>
      <label><input type="checkbox" v-model="iron"> </label>
    </div>
    <div>
      <label><input type="radio" name="firstColumn" value="product" v-if="isVisible('product')" v-model="radio"> </label>
      <label><input type="radio" name="firstColumn" value="calories" v-if="isVisible('calories')" v-model="radio"> </label>
      <label><input type="radio" name="firstColumn" value="fat" v-if="isVisible('fat')" v-model="radio"> </label>
      <label><input type="radio" name="firstColumn" value="carbs" v-if="isVisible('carbs')" v-model="radio"> </label>
      <label><input type="radio" name="firstColumn" value="protein" v-if="isVisible('protein')" v-model="radio"> </label>
      <label><input type="radio" name="firstColumn" value="iron" v-if="isVisible('iron')" v-model="radio"> </label>
    </div>
    <table>
      <tr>
        <th v-show="isVisible('product')" :class="{ first: isFirst('product') }">Product(100g serving)</th>
        <th v-show="isVisible('calories')" :class="{ first: isFirst('calories') }">Calories</th>
        <th v-show="isVisible('fat')" :class="{ first: isFirst('fat') }">Fat (g)</th>
        <th v-show="isVisible('carbs')" :class="{ first: isFirst('carbs') }">Carbs (g)</th>
        <th v-show="isVisible('protein')" :class="{ first: isFirst('protein') }">Protein (g)</th>
        <th v-show="isVisible('iron')" :class="{ first: isFirst('iron') }">Iron (%)</th>
      </tr>
      <tr v-for="items in products" v-bind:key="items.id">
        <td v-for="(item, key) in sortedList(items)" v-show="isVisible(key)" :class="{ first: isFirst(key) }" :key="item.id">{{ item }}</td>
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
      iron: true,
      radio: 'product',
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
    },

    isFirst(key) {
      if (key === this.radio) {
        return true;
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

tr {
  display: flex;
  justify-content: space-around;
}

td {
  order: 1;
}

th {
  order: 1;
}

.first {
  order: 0;
  opacity: 0.9;
}
</style>
