<template>
  <div class="col-md-10">
    <div class="row">
      <div class="col-sm-6 col-md-6 col-lg-4 mt-2" v-for="lesson in lessonList">
        <div class="card card-width rounded-0 shadow-sm">
          <div class="card-body d-flex justify-content-between">
            <div>
              <span class="card-text fs-14">
                Subject: <b class="card-subtitle mb-2 fs-14">{{ lesson.subject }}</b>
              </span><br>
              <span class="card-text fs-14">
                Location: <b class="card-subtitle mb-2 fs-14">{{ lesson.location }}</b>
              </span><br>
              <span class="card-text fs-14">
                Price: <b class="card-subtitle mb-2 fs-14">£{{ lesson.price }}</b>
              </span><br>
              <span class="card-text fs-14">
                Spaces: <b class="card-subtitle mb-2 fs-14">{{ lesson.space }}</b>
              </span><br>
              <span class="card-text fs-18">
                <i v-bind:class="lesson.icon"></i>
              </span><br>
              <button v-bind:class="{ disabled: lesson.numberOfSpaces <= 0 }" @click="addToCart(lesson._id)"
                class="card-link btn btn-dark btn-sm mt-md-5 px-lg-2">
                <i class="fas fa-plus mx-1"></i>
                <span class="d-none d-xl-inline">Add to cart</span>
              </button>
            </div>
            <br>
            <img v-bind:src="lesson.image" class="img-fluid border rounded" style="height: 300px; width: 300px;">
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["lessonList", "search"],
  methods: {
    addToCart: function (_id) {
      this.$emit("add-to-cart", _id);
    }
  }
}
</script>