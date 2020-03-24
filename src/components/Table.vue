<template>
  <div class="hello">
    <div>
      <label class="all"><input type="checkbox" v-model="selectAll">ALL</label>
      <label v-for="item in items" :key="item.id"><input type="checkbox" :value="item.text" v-model="checkbox"> </label>
    </div>
    <div>
      <label v-for="item in items" :key="item.id"><input type="radio" name="firstColumn" :value="item.text" v-if="isVisible(item.text)" v-model="radio"> </label>
    </div>
    <table>
      <tr>
        <th v-show="isVisible('product')" :class="{ first: isFirst('product') }" @click="sortBy('product')">Product(100g serving)</th>
        <th v-show="isVisible('calories')" :class="{ first: isFirst('calories') }" @click="sortBy('calories')">Calories</th>
        <th v-show="isVisible('fat')" :class="{ first: isFirst('fat') }" @click="sortBy('fat')">Fat (g)</th>
        <th v-show="isVisible('carbs')" :class="{ first: isFirst('carbs') }" @click="sortBy('carbs')">Carbs (g)</th>
        <th v-show="isVisible('protein')" :class="{ first: isFirst('protein') }" @click="sortBy('protein')">Protein (g)</th>
        <th v-show="isVisible('iron')" :class="{ first: isFirst('iron') }" @click="sortBy('iron')">Iron (%)</th>
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
      checkbox: [
        'product',
        'calories',
        'fat',
        'carbs',
        'protein',

        'iron'
      ],
      radio: 'product',
      sortedStatus: false,
      pageNumber: 0,
      items: [
        {text: 'product'},
        {text: 'calories'},
        {text: 'fat'},
        {text: 'carbs'},
        {text: 'protein'},
        {text: 'iron'},
      ],
    }
  },

  computed: {
    ...mapState([
      'products'
    ]),

    selectAll: {
      get: function () {
        return this.items ? this.checkbox.length === this.items.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.items.forEach(function (item) {
            selected.push(item.text);
          });
        }

        this.checkbox = selected;
      }
    }
  },

  methods: {
    sortedList(list) {
      delete list.id;
      return list;
    },

    isFirst(key) {
      if (key === this.radio) {
        return true;
      }
    },

    isVisible(key) {
      for (let i = 0; i < this.checkbox.length; i++) {
        if (key === this.checkbox[i]) {
          return true;
        }
      }
    },

    sortBy(id) {
      if (this.sortedStatus) {
        this.$store.dispatch('sortByAsc', id);
      }
      else {
        this.$store.dispatch('sortByDes', id);
      }
      this.sortedStatus = !this.sortedStatus;
    },
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

  width: 1200px;

  font-size: 12px;
}

td {
  width: 250px;

  text-align: left;
}

th {
  order: 1;

  width: 250px;

  text-align: left;
}

.first {
  order: 0;
  opacity: 0.9;
}

.all {
  margin-right: 10px;
}
</style>
