<template>
  <div>
    <div class="flex items-start justify-center py-[90px] 2xl:items-center">
      <div class="flex flex-col justify-between lg:flex-row">
        <router-link
          :to="ROUTE_PATH.DIAGNOSE"
          class="mx-2 mt-[10px] flex flex-col justify-items-center rounded-lg bg-white p-4 shadow-md duration-300 ease-in-out hover:cursor-pointer hover:shadow-2xl lg:w-1/2"
        >
          <div class="flex flex-col items-center justify-center">
            <p class="text-3xl font-semibold">ฟีเจอร์ที่ 1</p>
            <img
              class="w-full max-w-[300px]"
              src="@/assets/images/tutorialOne.svg"
            />
          </div>
          <p class="text-2xl font-semibold">ค้นหาอะไหล่ที่คาดว่าจะเสีย</p>
          <p class="my-2 text-xl">1. ใส่ข้อมูลรถยนต์</p>
          <p class="my-2 text-xl">2. ใส่อาการรถยนต์ที่พบ</p>
          <p class="my-2 text-xl">3. กดค้นหา</p>
        </router-link>
        <router-link
          :to="ROUTE_PATH.BOOKMARK"
          class="mx-2 mt-[10px] flex flex-col justify-items-center rounded-lg bg-white p-4 shadow-md duration-300 ease-in-out hover:cursor-pointer hover:shadow-2xl lg:w-1/2"
        >
          <div class="flex flex-col items-center justify-center">
            <p class="text-3xl font-semibold">ฟีเจอร์ที่ 2</p>
            <img
              class="w-full max-w-[300px]"
              src="@/assets/images/tutorialTwo.svg"
            />
          </div>
          <p class="text-2xl font-semibold">เพิ่มอะไหล่ลงในรายการโปรด</p>
          <p class="my-2 text-xl">1. เลือกอะไหล่ที่สนใจ</p>
          <p class="my-2 text-xl">2. กดไอคอนบุ๊คมาร์คขวาบนของการ์ดอะไหล่</p>
          <p class="my-2 text-xl">3. สามารถดูรายการโปรดได้ที่หน้ารายการโปรด</p>
        </router-link>
      </div>
      <!-- <router-link
        :to="ROUTE_PATH.DIAGNOSE"
        class="bottom-[100px] mt-8 flex w-[180px] animate-bounce cursor-pointer flex-col items-center border bg-primary-500 p-5 text-white"
        >เริ่มต้นการใช้งาน</router-link
      > -->
    </div>
  </div>
</template>
<script>
import ROUTE_PATH from '@/constants/router'

export default {
  name: 'UserContent',
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
