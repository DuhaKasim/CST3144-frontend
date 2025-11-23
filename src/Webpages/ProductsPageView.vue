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
    try {
      const response = await fetch('https://cst3144-backend-3vp3.onrender.com/api/products');
      const products = await response.json();
      
      if (Array.isArray(products)) {
        this.products = products.filter(product => product !== null);
      } else {
        this.products = [];
        console.error('Products API did not return an array:', products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      this.products = [];
    }
  },
};
</script>