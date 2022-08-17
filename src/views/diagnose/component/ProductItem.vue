<template>
  <div
    class="relative hover:bg-primary-50"
    :class="{ 'border-t-2 border-neutral-300': index != 1 }"
  >
    <div
      class="flex cursor-pointer flex-col items-center justify-center gap-y-[15px] py-[15px] px-[21px]"
      @click="showDetail(product)"
    >
      <p>
        ยี่ห้อ <span class="text-black">{{ product.brand }}</span>
      </p>
      <p>
        ประเภท <span class="text-black">{{ product.serial_no }}</span>
      </p>
      <p>
        หมายเลขซีเรียล <span class="text-black">{{ product.serial_no }}</span>
      </p>
    </div>
    <span
      class="absolute right-[21px] top-0 cursor-pointer"
      @click="
        added.includes(product.serial_no)
          ? removeBookmark(product.serial_no)
          : addBookmark(product.serial_no)
      "
      ><svg
        width="20"
        height="26"
        viewBox="0 0 20 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="[
          added.includes(product.serial_no)
            ? 'fill-primary-500 stroke-primary-500'
            : 'stroke-black'
        ]"
      >
        <path
          d="M1.25 4.25C1.25 2.86929 2.36929 1.75 3.75 1.75H16.25C17.6307 1.75 18.75 2.86929 18.75 4.25V24.25L10 19.875L1.25 24.25V4.25Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
</template>
<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    bookmarked: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      added: this.bookmarked
    }
  },
  methods: {
    addBookmark(serial_no) {
      this.added.push(serial_no)
      this.$emit('add-bookmark', serial_no)
    },
    removeBookmark(serial_no) {
      this.added.splice(this.added.indexOf(serial_no), 1)
      this.$emit('remove-bookmark', serial_no)
    },
    showDetail(product) {
      this.$emit('show-detail', product)
    }
  }
}
</script>
