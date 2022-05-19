<template>
  <div class="min-h-screen">
    <NavBar />
    <slot></slot>
  </div>
</template>
<script>
import NavBar from '../navbar/NavBar.component.vue'
export default {
  name: 'AppLayout',
  components: {
    NavBar
  }
}
</script>
