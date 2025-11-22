<template>
    <div class="page-wrap">
        <h1>Products</h1>
        <ProductsList :products="products" />
</div>
</template>

<script>
import ProductsList from '../components/ProductsList.vue';

export default {
    name:"ProductsPageView",
    components: {
        ProductsList,
    },

    data() {
      return {
        products: [],
      }  
    },

    async created() {
      const response = await fetch('https://cst3144-backend-3vp3.onrender.com/api/products');
      const products = response.json();
      this.products = products.filter(product => product !== null);
    }
}
</script>