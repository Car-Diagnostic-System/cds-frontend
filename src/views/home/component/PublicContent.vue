<template>
  <div>
    <div
      class="relative flex min-h-screen items-center justify-center bg-primary-50"
    >
      <div class="flex max-w-[840px] flex-col">
        <div class="mx-5 flex flex-wrap justify-start">
          <div
            class="flex flex-col content-center justify-center justify-items-center"
          >
            <div class="flex flex-col items-center justify-center">
              <img
                class="w-full max-w-[630px]"
                src="@/assets/images/banner.svg"
              />
            </div>
            <div
              class="flex flex-col items-center justify-center rounded-md bg-primary-100 p-5"
            >
              <p class="text-justify indent-8 text-lg">
                จุดมุ่งหมายของโปรเจคคือการสร้างเว็บแอปพลิเคชันที่จะแสดงรายการความน่าจะเป็นของชิ้นส่วนที่ชำรุด
                โดยที่ผู้ใช้งานใส่ข้อมูลรถยนต์ซึ่งประกอบด้วย ยี่ห้อรถยนต์
                รุ่นรถยนต์ และ โฉมรถยนต์ จากนั้นพิมพ์อาการที่เกิดขึ้น
              </p>
              <p class="text-justify indent-8 text-lg">
                โปรเจคนี้ได้รับการร่วมมือจากบริษัท
                <strong>AUTOPAIR</strong>
                ซึ่งเป็นบริษัทบริษัทค้าชิ้นส่วนยานยนต์ออนไลน์ในประเทศไทย
                และบริหารจัดการและการจัดซื้อ สำหรับกิจการอู่ซ่อมรถยนต์
              </p>
              <img src="@/assets/images/Autopair.png" class="max-w-[250px]" />
            </div>
            <div class="flex flex-col items-center justify-center">
              <router-link
                :to="ROUTE_PATH.REGISTER"
                class="bottom-[100px] mt-8 flex w-[180px] animate-bounce cursor-pointer flex-col items-center border bg-primary-500 p-5 text-white"
              >
                เริ่มต้นการใช้งาน
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ROUTE_PATH from '@/constants/router'

export default {
  name: 'PublicContent',
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
