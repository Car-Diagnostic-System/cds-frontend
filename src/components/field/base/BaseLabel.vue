<template>
  <label class="flex text-[17px] font-bold leading-[22px] text-neutral-900"
    >{{ label }}
    <span class="text-neutral-500" v-if="helping">&nbsp;({{ helping }})</span>
    <span class="text-error-500" v-if="required">*</span></label
  >
</template>
<script>
export default {
  name: 'BaseLabel',
  props: {
    label: {
      type: String,
      require: true
    },
    helping: {
      type: String,
      require: false
    },
    required: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>
