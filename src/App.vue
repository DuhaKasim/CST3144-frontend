<template>
  <div class="page-wrap">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar },

  setup() {
    // reactive mapping: productId → spaces left
    const spacesLeft = ref({
      "123": 10,
      "456": 15,
      "789": 20,
    })

    function updateSpacesLeft(id, amount = 1) {
      if (spacesLeft.value[id] !== undefined) {
        spacesLeft.value[id] -= amount
      }
    }

    provide('spacesLeft', spacesLeft)
    provide('updateSpacesLeft', updateSpacesLeft)

    return { spacesLeft }
  }
}
</script>
 