<template>
    <div>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <h3 class="location">{{ product.location }}</h3>
            <h3 class="spaces-left">Spaces left: {{ product.spaces ?? 10 }}</h3>
            <button 
                :disabled="product.spaces === 0"
                @click="addToCart(product)"
                class="add-to-cart"
            >
             {{ product.spaces === 0 ? "Sold Out" : "Add to Cart" }}
            </button>
            </div>
        </div>
    
    <div v-else>
        <NotFoundPage />
    </div>
    </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import { inject } from 'vue'

export default {
    name:"ProductDetailPage",
      setup() {
    const updateSpacesLeft = inject('updateSpacesLeft')
    return { updateSpacesLeft }
  },


    data() {
        return {
            product: {},
            cartItems: [],
        }
    },

    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item && item.id === this.$route.params.productId);

        }
    },

        methods:  {
            
    async addToCart() {

     await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.product.id })
    });

    // Show alert
    alert('Successfully added item to cart!');

    // Fetch updated product info from backend (including spaces left)
    const productResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/products/${this.product.id}`);
    this.product = await productResponse.json();

    // Optionally refresh the cart items
    const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart`);
    this.cartItems = await cartResponse.json();
    },

    async removeFromCart(productId) {
    await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart/${productId}`, {
        method: 'DELETE'
    });

    // Fetch updated product info
    const productResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/products/${productId}`);
    this.product = await productResponse.json();

    // Fetch updated cart
    const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart`);
    this.cartItems = await cartResponse.json();
    }
    },

    components: {
        NotFoundPage
    },

    async created() {
        // Fetch product
        const response = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/products/${this.$route.params.productId}`);
        this.product = await response.json();

        const savedSpaces = localStorage.getItem(`spaces_${this.product.id}`);
        if (savedSpaces) {
            this.product.spaces = parseInt(savedSpaces);
        }

        // Fetch cart
        const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart`);
        this.cartItems = await cartResponse.json();
        },
       
    }
    </script>