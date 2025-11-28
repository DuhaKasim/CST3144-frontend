<template>
  <div class="page-wrap">
    <h1>Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
      <ShoppingCartList 
        @remove-from-cart="removeFromCart($event)" 
        :products="cartItems" 
      />

      <!-- Checkout Form -->
      <div class="checkout-form">
        <input
          type="text"
          v-model="name"
          placeholder="Enter your name"
        />
        <p v-if="name && !validName" class="error-msg">Name must contain letters only.</p>

        <input
          type="text"
          v-model="phone"
          placeholder="Enter your phone number"
        />
        <p v-if="phone && !validPhone" class="error-msg">
          Phone must contain numbers only.
        </p>

        <button 
          class="checkout-button"
          :disabled="!canCheckout"
          @click="checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>

    <div v-if="cartItems.length === 0">
      You currently have no items in your cart!
    </div>
  </div>
</template>

<script>
import ShoppingCartList from '../components/ShoppingCartList.vue';

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },

  data() {
    return {
      cartItems: [],
      name: localStorage.getItem("checkout_name") || "",
      phone: localStorage.getItem("checkout_phone") || ""
    };
  },

  computed: {
    validName() {
      return /^[A-Za-z\s]+$/.test(this.name);
    },
    validPhone() {
      return /^[0-9]{10,11}$/.test(this.phone);
    },
    canCheckout() {
      return this.validName && this.validPhone;
    }
  },

  methods: {
    async removeFromCart(productId) {
      const response = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart/${productId}`,
        { method: "DELETE" }
      );

      const updatedCart = await response.json();
      this.cartItems = updatedCart.filter(product => product !== null);
    },

    checkout() {
      localStorage.setItem("checkout_name", this.name);
      localStorage.setItem("checkout_phone", this.phone);

      alert("Checkout complete! Thank you");
    }
  },

  async created() {
    const response = await fetch("https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart");
    const cartItems = await response.json();
    this.cartItems = cartItems.filter(product => product !== null);
  }
};
</script>