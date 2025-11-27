<template>
  <div>
    <!-- SEARCH + SORT CONTROLS ABOVE GRID -->
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
        {{ sortOrder === 'asc' ? '⬆ Asc' : '⬇ Desc' }}
      </button>
    </div>

    <!-- ORIGINAL GRID WRAP + CARDS -->
    <div class="grid-wrap">
      <div
        class="product-item"
        v-for="product in filteredSortedProducts"
        :key="product.id"
      >
        <img :src="product.imageUrl" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-location">{{ product.location }}</p>
        <p class="spaces-left">Spaces left: {{ product.spaces ?? 10 }}</p>

        <router-link :to="'/products/' + product.id">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
  data() {
    return {
      searchQuery: "",
      sortField: "",
      sortOrder: "asc",
    };
  },
  computed: {
    filteredSortedProducts() {
      let result = [...this.products];

      // SEARCH BY NAME
      if (this.searchQuery.trim() !== "") {
        const q = this.searchQuery.toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(q));
      }

      // SORTING
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