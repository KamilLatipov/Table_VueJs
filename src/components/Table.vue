<template>
  <div class="hello">
    <div>
      <label class="all"><input type="checkbox" v-model="selectAll">ALL</label>
      <label v-for="item in items" :key="item.id"><input type="checkbox" :value="item.value" v-model="checkboxShow"> {{ item.text }} </label>
    </div>
    <div>
      <label v-for="item in items" :key="item.id"><input type="radio" name="firstColumn" :value="item.value" v-if="isVisible(item.value)" v-model="radio"> </label>
    </div>
    <table>
      <tr>
        <th>
          <label><input type="checkbox" v-model="deleteAll"></label>
        </th>
        <th v-show="isVisible('product')" v-for="item in items" :class="{ first: isFirst(item.value) }" :key="item.id">
          <span v-if="isFirst(item.value)" @click="sortBy(item.value)"> {{ item.text }} </span>
          <span v-else> {{ item.text }} </span>
        </th>
      </tr>
      <tr v-for="items in products" v-bind:key="items.id">
        <td>
          <label><input type="checkbox" :value="items.product" v-model="checkboxDelete"></label>
        </td>
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
      checkboxShow: [
        'product',
        'calories',
        'fat',
        'carbs',
        'protein',
        'iron'
      ],
      checkboxDelete: [
      ],
      radio: 'product',
      sortedStatus: false,
      pageNumber: 0,
      items: [
        {value: 'product', text: 'Product(100g serving)'},
        {value: 'calories', text: 'Calories'},
        {value: 'fat', text: 'Fat (g)'},
        {value: 'carbs', text: 'Carbs (g)'},
        {value: 'protein', text: 'Protein (g)'},
        {value: 'iron', text: 'Iron (%)'},
      ],
    }
  },

  computed: {
    ...mapState([
      'products'
    ]),

    selectAll: {
      get: function () {
        return this.items ? this.checkboxShow.length === this.items.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.items.forEach(function (item) {
            selected.push(item.value);
          });
        }

        this.checkboxShow = selected;
      }
    },

    deleteAll: {
      get: function () {
        return this.products ? this.checkboxDelete.length === this.products.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.products.forEach(function (item) {
            selected.push(item.product);
          });
        }

        this.checkboxDelete = selected;
      }
    },
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
      for (let i = 0; i < this.checkboxShow.length; i++) {
        if (key === this.checkboxShow[i]) {
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
  order: 2;

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
