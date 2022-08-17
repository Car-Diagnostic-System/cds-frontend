<template>
  <div
    class="mx-2 my-2 w-full max-w-[400px] px-2 py-2 drop-shadow-sm duration-200 ease-in hover:drop-shadow-lg md:w-1/2"
  >
    <div
      class="relative flex cursor-pointer flex-col items-center justify-center gap-y-[10px] bg-white py-4 px-[21px]"
      @click="onClick"
    >
      <p class="font-semibold text-primary-800">
        {{ bookmark.item_name }}
      </p>
      <p>
        <span class="mr-1 font-semibold text-black">ยี่ห้อ:</span
        >{{ bookmark.brand }}
      </p>
      <p>
        <span class="mr-1 font-semibold text-black">ประเภท:</span
        >{{ bookmark.item_group }}
      </p>
      <p>
        <span class="mr-1 font-semibold text-black">หมายเลขซีเรียล:</span
        >{{ bookmark.serial_no }}
      </p>
    </div>
    <span
      class="absolute top-[15px] right-[21px] cursor-pointer"
      @click="removeBookmark(bookmark.serial_no)"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-neutral-600 hover:fill-error-600"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        />
      </svg>
    </span>
  </div>
</template>
<script>
export default {
  name: 'BookmarkItem',
  props: {
    bookmark: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeBookmark(serial_no) {
      this.$emit('remove-bookmark', serial_no)
    },
    onClick() {
      this.$emit('click', this.bookmark)
    }
  }
}
</script>
