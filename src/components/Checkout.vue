<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-4 mt-2" v-for="item in cart">
        <div class="card card-width rounded-0 shadow-sm">
          <div class="card-body d-flex justify-content-between">
            <div>
              <span class="card-text fs-14">Subject:
                <b class="card-subtitle mb-2 fs-14">{{ item.lesson.subject }}</b>
              </span>
              <br />
              <span class="card-text fs-14">Location:
                <b class="card-subtitle mb-2 fs-14">{{ item.lesson.location }}</b>
              </span>
              <br />
              <span class="card-text fs-14">Price:
                <b class="card-subtitle mb-2 fs-14">£{{ item.lesson.price }}</b>
              </span>
              <br />
              <span class="card-text fs-14">Spaces:
                <b class="card-subtitle mb-2 fs-14">{{ item.space }}</b>
              </span>
              <br />
              <span class="card-text fs-18"><i v-bind:class="item.lesson.icon"></i></span><br />
              <button @click="removeFromCart(item.lessonId)" class="card-link btn btn-dark btn-sm mt-md-5 px-lg-2">
                <i class="fas fa-minus mx-1"></i> Remove
              </button>
            </div>
            <img v-bind:src="item.lesson.image" v-bind:alt="item.lesson.altText" class="img-fluid border rounded"
              style="height: 300px; width: 300px;" />
          </div>
        </div>
      </div>
    </div>
    <hr>
    <p class="text-center mt-5">Checkout</p>
    <form>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <input type="text" class="form-control" placeholder="Enter name">
        </div>
        <div class="col-md-6 col-lg-4">
          <input type="number" class="form-control" placeholder="Enter phone number">
        </div>
      </div>
    </form>
    <div class="row mt-5 text-center">
      <div class="col-12">
        <button v-on:click="showConfirmationDialog" class="card-link btn btn-dark btn-sm px-3">
          <i class="fas fa-check mx-2"></i> Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: ["cart"],
  methods: {

    removeFromCart: function (_id) {
      this.$emit("remove-from-cart", _id);
    },

    showConfirmationDialog() {
      alert('Order has been submitted successfully')
      location.reload();
    }
  }
}
</script>
