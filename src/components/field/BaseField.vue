<template>
  <Field :name="name" :type="type" v-slot="{ field }" :value="value">
    <input
      v-bind="field"
      v-facade="mask"
      :type="type"
      class="h-[41px] w-full rounded-lg border-[1px] px-4 text-sm font-normal leading-[17px] outline-none focus:text-black focus:placeholder-transparent disabled:!border-neutral-100 disabled:bg-neutral-100 disabled:!placeholder-neutral-500"
      :class="[
        errors && touched
          ? '!border-error-500 bg-error-100 text-error-400 placeholder-error-400 transition duration-300 ease-in-out focus:ring-2 focus:ring-error-200'
          : '!border-neutral-500 text-black  placeholder-neutral-500 transition duration-300 ease-in-out focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200'
      ]"
      :placeholder="placeholder"
      :disabled="disabled"
      :readOnly="readOnly"
      :required="required"
      :maxLength="maxLength"
      @change="$emit('change')"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
  </Field>
</template>
<script>
import { Field } from 'vee-validate'
export default {
  name: 'BaseField',
  components: { Field },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'text',
      validator: (prop) => ['text', 'search', 'password', 'file'].includes(prop)
    },
    errors: {
      type: Boolean,
      required: true
    },
    touched: {
      type: Boolean,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      required: false
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    mask: {
      type: String,
      required: false
    }
  }
}
</script>
