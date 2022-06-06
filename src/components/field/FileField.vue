<template>
  <div class="flex h-auto w-full flex-col">
    <BaseLabel :label="label" :required="required" :helping="helping" />
    <Field
      type="file"
      :accept="accept"
      :name="name"
      class="!bg-white transition duration-300 ease-in-out hover:!bg-neutral-200"
      :class="[
        errors.length && meta.touched
          ? '!border-error-500 !bg-error-100 text-error-400 placeholder-error-400 focus:ring-2 focus:ring-error-200'
          : '!border-neutral-500  text-black placeholder-neutral-500 focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200'
      ]"
    />
    <div class="h-[15px]" v-if="showError">
      <BaseErrorMessage v-if="meta.touched" :name="name" />
    </div>
  </div>
</template>
<script>
import { Field } from 'vee-validate'
import { useField } from 'vee-validate'
import BaseLabel from './BaseLabel'
import BaseErrorMessage from './BaseErrorMessage.vue'

export default {
  name: 'FileField',
  components: { Field, BaseLabel, BaseErrorMessage },
  props: {
    name: {
      type: String,
      required: true
    },
    accept: {
      type: String
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    showError: {
      type: Boolean,
      required: false,
      default: true
    },
    helping: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    const { errors, value, meta } = useField(this.name)
    return {
      errors,
      value,
      meta
    }
  }
}
</script>
