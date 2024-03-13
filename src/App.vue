<template>
  <div class="container py-5 px-md-5" id="app">
    <p class="sitename">{{ sitename }}</p>
    <hr>

    <div class="row mb-3 text-center">
      <div class="col-8">
        <br>
        <button :class="{ 'disabled': cart.length <= 0 }" class="card-link btn btn-dark btn-sm px-3 text-center"
          @click="showCheckout">
          <i class="fas fa-arrow-right mx-2"></i>Checkout {{ cart.reduce((total, item) => total + item.space, 0)
          }}
        </button>
        <br>
      </div>
    </div>
    <br>

    <div class="row pt-2">
      <main class="d-flex justify-content-center">
        <component :is="currentView" :lessonList="lessons" @add-to-cart="addToCart" @remove-from-cart="removeFromCart"
          :cart="cart" />
      </main>
    </div>
  </div>
</template>

<script>

import Checkout from "./components/Checkout.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",

  data() {
    return {
      sitename: "After School",
      currentView: ProductList,
      lessons: [],
      cart: [],
      name: '',
      search: '',
      phoneNumber: '',
    }
  },

  components: { ProductList, Checkout },

  created: function () {
    this.fetchLessons();
  },
  methods: {

    // Fetch all the lessons
    fetchLessons() {
      let vm = this;
      fetch("http://18.133.250.148:3000/lessons/getLessons").then(
        function (response) {
          response.json().then(
            function (json) {
              vm.lessons = json;
              console.log(json)
            }
          )
        });
    },


    // add to cart
    addToCart(_id) {
      var lesson = this.getLessonById(_id);

      if (lesson.space > 0) {
        --lesson.space;

        var itemInCart = this.getCartItemFromCartByLessonId(_id);

        if (itemInCart != null) {
          ++itemInCart.space;
        } else {
          itemInCart = { lessonId: _id, space: 1, lesson: lesson };
          this.cart.push(itemInCart);
        }
      }
    },

    // remove item from cart
    removeFromCart(lessonId) {
      var itemInCart = this.getCartItemFromCartByLessonId(lessonId);

      if (itemInCart.space == 1) {
        var index = this.cart.map(x => x.lessonId).indexOf(lessonId);
        this.cart.splice(index, 1);

        if (this.cart.length <= 0) {
          this.showCheckout();
        }
      } else {
        --itemInCart.space;
      }

      var lesson = this.getLessonById(lessonId);
      ++lesson.space;
    },

    // get lessons id
    getLessonById(_id) {
      var lesson = this.lessons.find(u => u._id == _id);
      return lesson;
    },


    // Get cart item s
    getCartItemFromCartByLessonId(lessonId) {
      var item = this.cart.find(u => u.lessonId == lessonId);
      return item;
    },


    // Show checkout
    showCheckout() {
      if (this.currentView === Checkout) {
        this.title = 'Cart';
        this.currentView = ProductList
      }
      else {
        this.title = 'Home';
        this.currentView = Checkout
      };
    }
  }
}
</script>