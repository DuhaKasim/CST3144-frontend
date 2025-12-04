<template>
  <div>
    <div v-if="lesson">
      <div class="img-wrap">
        <img :src="lesson.imageUrl" />
      </div>
      <div class="lesson-details">
        <h1>{{ lesson.name }}</h1>
        <h3 class="price">{{ lesson.price }}</h3>
        <h3 class="location">{{ lesson.location }}</h3>
        <h3 class="spaces-left">Spaces left: {{ lesson.spaces ?? 10 }}</h3>
        <button 
          :disabled="lesson.spaces === 0"
          @click="addToCart(lesson)"
          class="add-to-cart"
        >
          {{ lesson.spaces === 0 ? "Sold Out" : "Add to Cart" }}
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
import { inject } from 'vue';

export default {
  name: "LessonsDetailPage",

  setup() {
    const updateSpacesLeft = inject('updateSpacesLeft');
    return { updateSpacesLeft };
  },

  data() {
    return {
      lesson: {}, 
      cartItems: [],
    };
  },

  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item && item.id === this.$route.params.lessonId);
    }
  },

  methods: {
    async addToCart() {
      // Add to cart backend call
      await fetch(`https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.lesson.id })
      });

      alert("Successfully added lesson to cart!");

      // Refresh lesson
      const lessonResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/lessons/${this.lesson.id}`);
      this.lesson = await lessonResponse.json();

      // Refresh cart
      const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`);
      this.cartItems = await cartResponse.json();
    },

    async removeFromCart(lessonId) {
      // Remove from cart (increments spaces)
      await fetch(`https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart/${lessonId}`, {
        method: 'DELETE'
      });

      // Refresh lesson spaces
      const lessonResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/lessons/${lessonId}`);
      this.lesson = await lessonResponse.json();

      // Refresh cart
      const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`);
      this.cartItems = await cartResponse.json();
    }
  },

  components: {
    NotFoundPage
  },

  async created() {
    const response = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/lessons/${this.$route.params.lessonId}`);
    this.lesson = await response.json();

    const cartResponse = await fetch(`https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`);
    this.cartItems = await cartResponse.json();
  }
};
</script>
