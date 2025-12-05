<template>
  <div class="page-wrap">
    <h1>Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
      <ShoppingCartList
        :lessons="cartItems"
        @remove-from-cart="removeFromCart"
      />

      <div class="checkout-form">
        <input
          type="text"
          v-model="name"
          placeholder="Enter your full name"
        />
        <p v-if="name && !validName" class="error-msg">Name must contain letters only.</p>

        <input
          type="text"
          v-model="phone"
          placeholder="Enter your phone number"
        />
        <p v-if="phone && !validPhone" class="error-msg">Phone must contain numbers only.</p>

        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
        />
        <p v-if="email && !validEmail" class="error-msg">Enter a valid email.</p>

        <button
          class="checkout-button"
          :disabled="!canCheckout"
          @click="checkout"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>

    <div v-else>
      You currently have no items in your cart!
    </div>
  </div>
</template>

<script>
import ShoppingCartList from "../components/ShoppingCartList.vue";

export default {
  name: "ShoppingCartPage",
  components: { ShoppingCartList },

  data() {
    return {
      cartItems: [],
      name: localStorage.getItem("checkout_name") || "",
      phone: localStorage.getItem("checkout_phone") || "",
      email: localStorage.getItem("checkout_email") || "",
    };
  },

  computed: {
    validName() {
      return /^[A-Za-z\s]+$/.test(this.name);
    },
    validPhone() {
      return /^[0-9]{10,11}$/.test(this.phone);
    },
    validEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    canCheckout() {
      return this.validName && this.validPhone && this.validEmail;
    },
  },

  methods: {
    async removeFromCart(lessonId) {
      const response = await fetch(
        `https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart/${lessonId}`,
        { method: "DELETE" }
      );
      const updatedCart = (await response.json()).filter(x => x);
      this.cartItems = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    },

    checkout() {
      localStorage.setItem("checkout_name", this.name);
      localStorage.setItem("checkout_phone", this.phone);
      localStorage.setItem("checkout_email", this.email);
      alert("Checkout complete! Thank you");
    },

    updateCartFromStorage() {
      const cartData = localStorage.getItem("cartItems");
      if (cartData) this.cartItems = JSON.parse(cartData).filter(x => x);
    },
  },

  async created() {
    this.updateCartFromStorage();
  },
};
</script>
