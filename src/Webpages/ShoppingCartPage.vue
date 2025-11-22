<template>
  <div class="page-wrap">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length>0">
        <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
            <button class="checkout-button">Proceed to Checkout</button>
        </div>
        <div v-if="cartItems.length === 0">
            You currently have no items in your cart!
        </div>

    </div>
</template>

<script>
import ShoppingCartList from '../components/ShoppingCartList.vue';


    export default {
        name:"ShoppingCartPage",
        components: {
            ShoppingCartList,
        },
        
        data() {
            return {
                cartItems: [],
            }
        },
    methods: {
        async removeFromCart(productId) {
            const response = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart/${productId}`, {
                method: 'DELETE'
            });
            const updatedCart = await response.json();
            this.cartItems = updatedCart.filter(product => product !== null);
        },
    },

    async created() {
        const response = await fetch('https://cst3144-backend-3vp3.onrender.com/api/users/12345/cart');
        const cartItems = await response.json();
        this.cartItems = cartItems.filter(product => product !== null);
    }
        
    }

</script>