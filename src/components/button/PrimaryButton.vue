<template>
  <BaseButton
    class="bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-900 disabled:!text-neutral-500"
    :actionType="actionType"
    :type="type"
    :isLoading="isLoading"
  >
    <slot />
  </BaseButton>
</template>
<script>
import BaseButton from '../button/BaseButton'

export default {
  name: 'PrimaryButton',
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
