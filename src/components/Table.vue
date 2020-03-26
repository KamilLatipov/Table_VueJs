<template>
  <div class="main-page">
    <header class="main-page__header">
      <div class="header__sort">
        <p class="header__sort-text">Sorting by:</p>
        <label v-for="item in items" class="radio" :key="item.id">
          <input type="radio" name="firstColumn" :value="item.value" v-if="isVisible(item.value)" v-model="radio">
          <span class="radio__text">{{ item.text }}</span>
        </label>
      </div>
      <div class="header__filter">
        <div class="header__delete">
          <button class="button" :class="[checkboxDelete.length !== 0 ? 'button--active' : 'button--inactive']" @click="deleteProducts(checkboxDelete)">
            Delete
            <span v-if="this.checkboxDelete.length > 0"> ({{ checkboxDelete.length }}) </span>
          </button>
        </div>
        <div class="header__pagination">
          <select class="button button__dropdown" v-model="pageSize">
            <option :value="10">10 per Page</option>
            <option :value="15">15 per Page</option>
            <option :value="20">20 per Page</option>
          </select>
          <div class="header__pages">
            <button class="button button-prev button__arrow" @click="prevPage" :disabled="this.pageNumber === 0"></button>
            <p class="pages__text">
              <strong>{{ this.startItem + 1 }} - {{ this.endItem }}</strong>
              of
              <strong>{{ this.products.length }}</strong>
            </p>
            <button class="button button-next button__arrow" @click="nextPage" :disabled="this.pageNumber >= this.pageCount - 1"></button>
          </div>
        </div>
        <div class="header__columns">
          <button class="button button__icon" @click="dropdown()">
            {{ checkboxShow.length }} columns selected
          </button>
          <div class="header__dropdown">
            <div class="header__wrapper" v-show="this.dropdownClicked">
              <label class="checkbox checkbox__all checkbox__columns">
                Select All
                <input type="checkbox" v-model="selectAll">
                <span class="checkmark checkmark--columns"></span>
              </label>
              <label class="checkbox checkbox__columns" v-for="item in items" :key="item.id">
                {{ item.text }}
                <input type="checkbox" :value="item.value" v-model="checkboxShow">
                <span class="checkmark checkmark--columns"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
    <table class="table">
      <tr class="table__header">
        <th class="table__checkbox">
          <label class="checkbox checkbox--header">
            <input type="checkbox" v-model="deleteAll">
            <span class="checkmark"></span>
          </label>
        </th>
        <th v-for="item in items"  v-show="isVisible(item.value)" :class="{ 'firstColumn': isFirst(item.value) }" :key="item.id">
          <p class="table__column-name" v-if="isFirst(item.value)" :class="[ sortedStatus ? 'table__arrow-up' : 'table__arrow-down']" @click="sortBy(item.value)">
            {{ item.text }}
          </p>
          <p class="table__column-name" v-else> {{ item.text }} </p>
        </th>
        <th></th>
      </tr>
      <tr class="table__row" v-for="(items, index) in paginatedList(this.products)" @mouseover="Hover = index"  @mouseleave="Hover = null"  :key="items.id" :class="{'even-row': index %  2 !== 0 }">
        <td class="table__checkbox">
          <label class="checkbox">
            <input type="checkbox" :value="items.product" v-model="checkboxDelete">
            <span class="checkmark"></span>
          </label>
        </td>
        <td v-for="(item, key) in sortedList(items)" v-show="isVisible(key)" :class="{ 'firstColumn': isFirst(key) }" :key="item.id">
          <p class="table__cell">{{ item }}</p>
        </td>
        <td class="table__delete">
          <span class="table__hover table__delete-icon" v-show="Hover === index" @click="deleteClicked = index"> delete </span>
          <div class="table__confirm" v-show="deleteClicked === index">
            <p>Are you sure you want to <strong>delete item</strong> ?</p>
            <div class="table__buttons">
              <button class="button" @click="deleteClicked = null">Cancel</button>
              <button class="button button--active" @click="deleteProducts(items.product)">Delete</button>
            </div>
          </div>
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
      dropdownClicked: false,
      deleteClicked: null,
      Hover: null,
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
        this.$store.dispatch('deleteProducts', deleteArray);
        this.deleteClicked = null;
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
      this.dropdownClicked = !this.dropdownClicked;
    }
  }
}
</script>

<style scoped lang="scss">
.button__dropdown {
  background-image: url('../assets/img/dropdown.png');
}

.button-prev {
  background-image: url('../assets/img/Left.png');
}

.button-next {
  background-image: url('../assets/img/Right.png');
}

.table__arrow-up {
  background-image: url('../assets/img/up.png');
  background-repeat: no-repeat;
  background-position: top 50% left 90%;
  background-size: 15px 25px;
}

.table__arrow-down {
  background-image: url('../assets/img/down.png');
  background-repeat: no-repeat;
  background-position: top 50% left 90%;
  background-size: 15px 25px;
}

.button__icon {
  width: 155px;

  background-image: url('../assets/img/dropdown.png');
  background-repeat: no-repeat;
  background-position: top 50% left 95%;
  background-size: 9px 6px;
}

.table__delete-icon::before {
  content: '';
  position: absolute;

  right: 40px;
  top: 3px;

  width: 20px;
  height: 20px;

  background-image: url('../assets/img/Trash.png');
  background-repeat: no-repeat;
  background-position: top 50% right 100%;

  opacity: 0.7;
}

:disabled {
  opacity: 0.5;

  cursor: default;
}
</style>
