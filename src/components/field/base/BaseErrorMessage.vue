<template>
  <ErrorMessage
    class="flex justify-self-start text-sm font-normal leading-[17px] text-red-500"
    :name="name"
  />
</template>
<script>
import { ErrorMessage } from 'vee-validate'
export default {
  name: 'BaseErrorMessage',
  components: { ErrorMessage },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
