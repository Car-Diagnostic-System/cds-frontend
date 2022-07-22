<template>
  <button
    :type="type"
    class="flex h-[37px] w-full max-w-[140px] items-center justify-center rounded-md py-[10px] px-6 text-sm font-medium transition duration-300 ease-in-out hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-100"
    :class="[isLoading && 'pointer-events-none']"
    @click="click"
  >
    <div class="text-sm font-normal leading-[17px]" v-if="isLoading">
      <!-- <LoadingIcon /> -->
      <svg
        class="h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#F4F5F6"
          stroke-width="2"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <span v-else>
      {{ actionType === 'submit' ? 'บันทึก' : null }}
      {{ actionType === 'cancel' ? 'ยกเลิก' : null }}
      {{ actionType === 'edit' ? 'แก้ไข' : null }}
      {{ actionType === 'next' ? 'ถัดไป' : null }}
      {{ actionType === 'back' ? 'ย้อนกลับ' : null }}
      <slot />
    </span>
  </button>
</template>

<script>
// import LoadingIcon from '@/assets/icons/loading.svg?inline'

export default {
  name: 'BaseButton',
  //   components: { LoadingIcon },
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (prop) => ['button', 'submit', 'reset'].includes(prop),
      required: false
    },
    actionType: {
      type: String,
      validator: (prop) =>
        ['submit', 'cancel', 'edit', 'next', 'back'].includes(prop),
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    click: {
      type: Function,
      required: false
    }
  }
}
</script>
