<template>
  <div class="main-page">
    <header class="main-page__header">
      <div class="header__sort-by">
        Sorting by:
        <label class="header__sort-item" v-for="item in items" :key="item.id">
          <input class="" type="radio" name="firstColumn" :value="item.value" v-if="isVisible(item.value)" v-model="radio">
          {{ item.text }}
        </label>
      </div>
      <div class="header__delete">
        <button :class="{ 'header__delete--active': this.checkboxDelete.length !== 0 }" @click="deleteProducts(this.checkboxDelete)">
          Delete ({{ checkboxDelete.length }})
        </button>
      </div>
      <div class="header__pagination">
        <select v-model="pageSize">
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
        </select>
        <div class="header__pages">
          <button @click="prevPage" :disabled="this.pageNumber === 0">
            Previous
          </button>
          {{ this.startItem + 1 }} - {{ this.endItem }}
          of
          {{ this.products.length }}
          <button @click="nextPage" :disabled="this.pageNumber >= this.pageCount - 1">
            Next
          </button>
        </div>
      </div>
      <div class="header__columns">
        <button @click="dropdown()"></button>
        <div v-show="this.clicked">
          <label class="all"><input type="checkbox" v-model="selectAll">ALL</label>
          <label v-for="item in items" :key="item.id"><input type="checkbox" :value="item.value" v-model="checkboxShow"> {{ item.text }} </label>
        </div>
      </div>
    </header>
    <table class="table">
      <tr class="table__header">
        <th>
          <label><input type="checkbox" v-model="deleteAll"></label>
        </th>
        <th class="table__column-name" v-show="isVisible('product')" v-for="item in items" :class="{ first: isFirst(item.value) }" :key="item.id">
          <div v-if="isFirst(item.value)" @click="sortBy(item.value)">
            {{ item.text }}
            <span v-if="sortedStatus" class=".arrow_up">Up</span>
            <span v-else class=".arrow_down">Down</span>
          </div>
          <span v-else> {{ item.text }} </span>
        </th>
      </tr>
      <tr class="table__row" v-for="(items, index) in paginatedList(this.products)" v-bind:key="items.id" :class="{even_row: index %  2 !== 0 }">
        <td class="table__checkbox">
          <label><input type="checkbox" :value="items.product" v-model="checkboxDelete"></label>
        </td>
        <td class="table__cell" v-for="(item, key) in sortedList(items)" v-show="isVisible(key)" :class="{ first: isFirst(key) }" :key="item.id">
          {{ item }}
        </td>
        <td class="table__delete">
          <span @click="deleteProducts(items.product)"> delete </span>
        </td>
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
      pageSize: 10,
      startItem: null,
      endItem: null,
      clicked: false,
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

    pageCount(){
      let l = this.products.length;
      let s = this.pageSize;
      return Math.ceil(l/s);
    },

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

    //sorts column ascending/descending
    sortBy(id) {
      if (this.sortedStatus) {
        this.$store.dispatch('sortByAsc', id);
      }
      else {
        this.$store.dispatch('sortByDes', id);
      }
      this.sortedStatus = !this.sortedStatus;
    },

    deleteProducts(array) {
      if (Array.isArray(array)) {
        this.$store.dispatch('deleteProducts', this.checkboxDelete);
        this.checkboxDelete = [];
      }
      else {
        let deleteArray = [];
        deleteArray.push(array);
        alert(deleteArray);
        this.$store.dispatch('deleteProducts', deleteArray);
      }
    },

    paginatedList(products) {
      this.startItem = this.pageNumber * this.pageSize;
      this.endItem = this.startItem + this.pageSize;
      return products.slice(this.startItem, this.endItem);
    },

    nextPage(){
      this.pageNumber++;
    },

    prevPage(){
      this.pageNumber--;
    },

    dropdown() {
      this.clicked = !this.clicked;
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

button:hover:disabled{
  cursor:not-allowed;
}

.header__delete--active {
  color: white;

  background-color: #4B74FF;
}


  .even_row {
    opacity: 0.6;
  }
</style>
