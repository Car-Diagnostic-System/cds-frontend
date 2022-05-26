<template>
  <h1 class="text-[32px] font-bold leading-10 text-primary-800">
    {{ text }}
  </h1>
</template>
<script>
export default {
  name: 'HeaderText',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
