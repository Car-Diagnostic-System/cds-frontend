<template>
  <div class="mx-4 mt-5 flex max-w-[840px] flex-col bg-white lg:mx-auto">
    <div class="flex flex-wrap justify-start md:flex-row">
      <div class="mt-[10px] flex w-full flex-col md:w-1/4">
        <div class="my-1">
          <router-link
            class="item-center h-[30px] justify-start px-[10px] text-lg"
            :to="ROUTE_PATH.ACCOUNT + ROUTE_PATH.ACCOUNT_INFORMATION"
            >ข้อมูลส่วนตัว</router-link
          >
        </div>
        <div class="my-1">
          <router-link
            class="item-center my-2 h-[30px] justify-start px-[10px] text-lg"
            :to="ROUTE_PATH.ACCOUNT + ROUTE_PATH.ACCOUNT_PASSWORD"
            >แก้ไขรหัสผ่าน</router-link
          >
        </div>
      </div>
      <div class="flex w-full flex-col border-2 border-neutral-200 md:w-3/4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import ROUTE_PATH from '@/constants/router.js'
export default {
  name: 'AccountLayout',
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply !border-l-8 !border-primary-600 font-semibold;
}
</style>
