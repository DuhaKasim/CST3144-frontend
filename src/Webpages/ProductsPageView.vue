<template>
  <div class="page-wrap">
    <h1>Products</h1>
    <ProductsList :products="products" />
  </div>
</template>

<script>
import ProductsList from '../components/ProductsList.vue';

export default {
  name: "ProductsPageView",
  components: { ProductsList },

  data() {
    return {
      products: [],
    };
  },

  async created() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://cst3144-backend-3vp3.onrender.com/api/products');
        const products = await response.json();

        if (Array.isArray(products)) {
          this.products = products
            .filter(p => p !== null)
            .map(p => ({
              ...p,
              spaces: typeof p.spaces === 'number' ? p.spaces : 10
            }));
        }

      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
