<template>
  <div class="detail-page">
    <div v-if="lesson && lesson._id" class="detail-card">
      <img :src="lesson.imageUrl" class="detail-img" />

      <div class="detail-title">{{ lesson.name }}</div>
      <div class="detail-price">{{ lesson.price }}</div>
      <div class="detail-location">{{ lesson.location }}</div>
      <div class="detail-spaces">Spaces left: {{ lesson.spaces ?? 10 }}</div>

      <button
        class="detail-btn"
        :disabled="lesson.spaces === 0"
        @click="addToCart"
      >
        {{ lesson.spaces === 0 ? "Sold Out" : "Add to Cart" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonsDetailPage",

  data() {
    return {
      lesson: null,
      cartItems: [],
    };
  },

  methods: {
    async addToCart() {
      if (!this.lesson || !this.lesson._id) return;

      // Add lesson to cart API
      await fetch(
        `https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.lesson.id }),
        }
      );

      alert("Lesson added to cart!");

      // Decrement spaces locally
      if (this.lesson.spaces > 0) this.lesson.spaces -= 1;

      // Fetch updated cart and save to localStorage
      const cartRes = await fetch(
        `https://cst3144-backend-3vp3.onrender.com/api/orders/12345/cart`
      );
      const cart = (await cartRes.json()).filter(x => x);

      localStorage.setItem("cartItems", JSON.stringify(cart));

     
      this.$emit("cart-updated", cart);
    },
  },

  async created() {
    const lessonId = this.$route.params.lessonId;
    const res = await fetch(
      `https://cst3144-backend-3vp3.onrender.com/api/lessons/${lessonId}`
    );
    this.lesson = await res.json();
  },
};
</script>
