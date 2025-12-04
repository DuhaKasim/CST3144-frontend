<template>
  <div>
    <div class="controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by class name..."
        class="search-input"
      />
      <select v-model="sortField" class="sort-dropdown">
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="spaces">Spaces</option>
      </select>
      <button @click="toggleSortOrder" class="sort-button">
        {{ sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc" }}
      </button>
    </div>

    <div class="grid-wrap">
      <div
        class="lesson-item"
        v-for="lesson in filteredSortedLessons"
        :key="lesson.id"
      >
        <img :src="lesson.imageUrl" />
        <h3 class="lesson-name">{{ lesson.name }}</h3>
        <p class="lesson-price">{{ lesson.price }}</p>
        <p class="lesson-location">{{ lesson.location }}</p>
        <p class="spaces-left">Spaces left: {{ lesson.spaces ?? 10 }}</p>

        <router-link :to="'/lessons/' + lesson.id">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lessons"], 
  data() {
    return {
      searchQuery: "",
      sortField: "",
      sortOrder: "asc",
    };
  },
  computed: {
    filteredSortedLessons() {
      let result = [...this.lessons];

      // Search
      if (this.searchQuery.trim() !== "") {
        const q = this.searchQuery.toLowerCase();
        result = result.filter((l) => l.name.toLowerCase().includes(q));
      }

      // Sort
      if (this.sortField) {
        result.sort((a, b) => {
          let valA = a[this.sortField];
          let valB = b[this.sortField];

          if (typeof valA === "string") valA = valA.toLowerCase();
          if (typeof valB === "string") valB = valB.toLowerCase();

          return this.sortOrder === "asc"
            ? valA > valB
              ? 1
              : -1
            : valA < valB
            ? 1
            : -1;
        });
      }

      return result;
    },
  },
  methods: {
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
  },
};
</script>
