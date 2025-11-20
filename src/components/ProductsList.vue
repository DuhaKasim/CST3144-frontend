<template>
    <div>
    <div class="grid-wrap">
    <div 
        class="product-item"
        v-for="product in products"
        :key="product.id"
    >
        <img :src="product.imageUrl" />
        <h3 class="product-name"> {{ product.name }}</h3>
        <p class="product-price"> {{ product.price }}</p>
        <p class="product-location"> {{ product.location }}</p>
        <router-link :to="'/products/' + product.id">
            <button>View Details</button>
        </router-link>
        
        </div>
    </div>
    </div>
</template>


<script>
export default {
    name: "ProductsList",
    props: ['products'],
}

</script>