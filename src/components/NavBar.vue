<template>
  <div class="nav-bar">

    <!-- logo -->
    <router-link to="/lessons" class="logo-wrap">
      <img :src="logo" class="logo"/>
    </router-link>

    <!-- navigation links -->
    <div class="center-nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/lessons" class="nav-link">Lessons</router-link>
    </div>

    <!-- cart button (enabled when items exist) -->
    <router-link
      v-if="cartCount > 0"
      to="/cart"
      class="cart-link"
    >
      <button>Shopping Cart ({{ cartCount }})</button>
    </router-link>

    <!-- disabled cart button -->
    <button
      v-else
      class="cart-empty-btn"
      disabled
    >
      Cart Empty
    </button>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import logo from '@/assets/logo.png';

export default {
  name: "NavBar",
  setup() {
    const logoImg = logo;
    const cartCount = ref(0);

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartCount.value = cart.length;
    };

    onMounted(() => {
      updateCartCount();
      // Listen for storage events (from other tabs or when you trigger manually)
      window.addEventListener("storage", updateCartCount);
    });

    return { logo: logoImg, cartCount };
  },
};
</script>
