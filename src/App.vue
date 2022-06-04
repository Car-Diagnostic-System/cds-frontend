<template>
  <div class="font-kanit">
    <AppLayout>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </AppLayout>
  </div>
</template>
<script>
import AppLayout from '/src/components/layout/AppLayout'
export default {
  name: 'App',
  components: { AppLayout }
}
</script>
<style scoped>
/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
