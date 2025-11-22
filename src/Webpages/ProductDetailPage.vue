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
            <button @click = "addToCart" class="add-to-cart" v-if = "!itemIsInCart">Add to cart</button>
            <button class="grey-button" v-if = "itemIsInCart">Item is already in cart</button>
            </div>
        </div>
    
    <div v-else>
        <NotFoundPage />
    </div>
    </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';

export default {
    name:"ProductDetailPage",
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
            body: JSON.stringify({ id: this.$route.params.productId })
        });
        alert('Successfully added item to cart!');

        // Update cart items after adding
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

        // Fetch cart
        const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart`);
        this.cartItems = await cartResponse.json();
    }
    }
    </script>