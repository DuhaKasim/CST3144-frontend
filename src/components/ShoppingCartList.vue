<template>
  <div class="lessons-container">
    <div class="cart-item" v-for="lesson in lessons" :key="lesson._id">
      <!-- Image -->
      <div class="cart-img-wrap">
        <img :src="lesson.imageUrl" alt="Lesson Image" />
      </div>

      <!-- Details -->
      <div class="cart-details">
        <h3>{{ lesson.name }}</h3>
        <p>{{ lesson.price }}</p>
        <p>{{ lesson.location }}</p>
        <p>Spaces left: {{ lesson.spaces ?? 10 }}</p>

        <button class="remove-button" @click="$emit('remove-from-cart', lesson.id)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: ["lessons"],
};
</script>
