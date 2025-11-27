<template>
  <div class="nav-bar">

    <!-- logo -->
    <router-link to="/products" class="logo-wrap">
      <img :src="logo" class="logo"/>
    </router-link>

    <!-- navigation links -->
    <div class="center-nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/products" class="nav-link">Products</router-link>
    </div>

    <!--cart button -->
    <router-link to="/cart" class="cart-link">
      <button>Shopping Cart</button>
    </router-link>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: "NavBar",
  data() {
    return { logo };
  }
};
</script>