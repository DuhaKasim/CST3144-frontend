<template>
  <div>
    <div
      class="lessons-container"
      v-for="lesson in lessons"
      :key="lesson.id"
    >
      <img class="lesson-image" :src="lesson.imageUrl" />

      <div class="details-wrap">
        <h3>{{ lesson.name }}</h3>
        <p>{{ lesson.price }}</p>
        <p>{{ lesson.location }}</p>
      </div>

      <button
        @click="$emit('remove-from-cart', lesson.id)"
        class="remove-button"
      >
        Remove from Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: ['lessons'],
};
</script>
