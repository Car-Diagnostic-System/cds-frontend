<template>
  <label class="font-bold text-[17px] leading-[22px] text-neutral-900"> </label>
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
    }
  }
}
</script>
