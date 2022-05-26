<template>
  <BaseButton
    :type="type"
    class="bg-primary-100 text-primary-700 hover:bg-primary-300 active:bg-primary-500 active:text-white disabled:text-neutral-400"
    :actionType="actionType"
    :isLoading="isLoading"
  >
    <slot />
  </BaseButton>
</template>
<script>
import BaseButton from '../button/BaseButton'
export default {
  name: 'SecondaryButton',
  components: {
    BaseButton
  },
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
      required: false
    }
  }
}
</script>
