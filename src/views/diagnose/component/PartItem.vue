<template>
  <div>
    <div
      class="relative flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-y-[15px] rounded-lg bg-neutral-200 text-lg font-bold leading-[22px] hover:bg-neutral-300"
      @click="expand = !expand"
    >
      <span class="text-primary-800">อันดับ {{ rank }}</span>
      <span class="text-primary-900">{{ part.part }}</span>
      <div class="absolute right-3" :class="{ 'rotate-180': expand }">
        <svg
          width="25"
          height="16"
          viewBox="0 0 25 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 0.96875L12.5 15.0312L1.31245e-06 0.968748L25 0.96875Z"
            fill="#A7A7AD"
          />
        </svg>
      </div>
    </div>
    <transition name="fadeHeight" mode="out-in">
      <div
        class="mt-[11px] flex flex-col rounded-lg bg-neutral-100 text-lg leading-[22px] text-primary-700"
        v-if="expand"
      >
        <div v-if="part.product.length">
          <ProductItem
            :product="product"
            :index="idx + 1"
            v-for="(product, idx) in part.product"
            :key="idx"
          />
        </div>
        <div
          class="flex w-full flex-col items-center justify-center gap-y-4 py-4"
          v-else
        >
          <span class="text-error-700">ไม่มีอะไหล่สำหรับรถยนต์รุ่นนี้</span>
          <PrimaryButton class="">แจ้งความต้องการ</PrimaryButton>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ProductItem from './ProductItem.vue'
import PrimaryButton from '@/components/button/PrimaryButton'
export default {
  name: 'PartItem',
  components: {
    ProductItem,
    PrimaryButton
  },
  data() {
    return {
      expand: false
    }
  },
  props: {
    part: {
      type: Object,
      required: true
    },
    rank: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.1s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
