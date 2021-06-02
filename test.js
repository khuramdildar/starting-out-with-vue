Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
      <div class="product">
          <div class="product-image">
              <img :src="image" alt="" srcset="">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <a :href="link">Vue Documentation</a>
            <p v-if="inventory">In Stock</p>
            <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
            <p >{{ onSale }}</p>
            <p>Shipping: {{ shipping }}</p>
            <productDetails :details= "details"></productDetails>
            <div v-for="(varient, index) in varients" 
                :key="varient.varientId" 
                class="color-box"
                :style="{background: varient.color}" 
                @mouseover="productImage(index)">
            </div>
            <button @click="addToCart" 
                :disabled="!inStock" 
                :class="{disabledButton : !inStock}">Add to
            Cart</button>
            <span v-if="removeCart">
                <button @click="removeFromCart">Del from Cart</button>
            </span>  
          </div>
          <div>
              <h2>Reviews</h2>
              <p v-if="!reviews.length">There are no reviews yet</p>
              <ul>
                  <li v-for=" review in reviews">Name: {{ review.name }}</li>
                  <li v-for=" review in reviews">Rating: {{ review.rating }}</li>
                  <li v-for=" review in reviews">Description: {{ review.review }}</li>
              </ul>
          </div>
          <product-review @review-submitted="addReview"></product-review>
      </div>
    `,
  data() {
    return {
      description: "Fuzzy socks",
      brand: "Illegal",
      selectedVarient: 0,
      link: "https://vuejs.org/v2/guide/",
      removeCart: false,
      details: ["100% cotton", "Medium size", "Uni-Sex"],
      varients: [
        {
          color: "Green",
          varientId: 1212,
          image: "./assets/img.png",
          inventory: 10,
          inStock: true,
          onSale: true,
        },
        {
          color: "Blue",
          varientId: 1213,
          image: "./assets/img2.png",
          inventory: 0,
          inStock: true,
          onSale: false,
        },
      ],
      reviews: []
    };
  },
  computed: {
    title() {
      return this.brand + " " + this.description;
    },
    image() {
      return this.varients[this.selectedVarient].image;
    },
    inventory() {
      return this.varients[this.selectedVarient].inventory;
    },
    inStock() {
      return this.varients[this.selectedVarient].inStock;
    },
    onSale() {
      if (!this.varients[this.selectedVarient].onSale) {
        return this.brand + " " + this.description + " is not on Sale!";
      }
      return this.brand + " " + this.description + " is  on Sale!";
    },
    shipping() {
      if (this.premium) {
        return "free";
      } else return 2.99;
    },
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.varients[this.selectedVarient].varientId)
      this.removeCart = true;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.varients[this.selectedVarient].varientId)

    },
    productImage(index) {
      this.selectedVarient = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview),
        console.log(this.reviews)
    }
  },
});
Vue.component("productDetails", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
});
Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length" >
          <b>Please solve the following error(s):</b>
          <ul class = "error">
              <li v-for="error in errors">{{error}}</li>
          </ul>
      </p>
      <p>
        <label for="name">Name*:</label>
        <input id="name" v-model="name" placeholder="name" >
      </p>
      
      <p>
        <label for="review">Review*:</label>      
        <textarea id="review" v-model="review" ></textarea>
      </p>
      
      <p>
        <label for="rating">Rating*:</label>
        <select id="rating" v-model.number="rating" >
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.rating && this.review) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        }
        this.$emit('review-submitted', productReview)
        this.name = null,
          this.review = null,
          this.rating = null
      }
      else {
        if (!this.name) this.errors.push("Name Required.")
        if (!this.rating) this.errors.push("Rating Required.")
        if (!this.review) this.errors.push("Review Required.")
      }
    },

  },
})
let para = new Vue({
  el: "#para",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    updateAfterRemove(id) {
      // this.cart.pop()
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
});
