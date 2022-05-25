<template>
  <div class="flex h-auto w-full flex-col">
    <BaseLabel :label="label" :required="required" :helping="helping" />
    <div>
      <BaseField
        :name="name"
        :type="type"
        :errors="errors.length"
        :touched="meta.touched"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :value="valueField"
        :readOnly="readOnly"
        :maxLength="maxLength"
        :mask="mask"
        @change="$emit('change')"
      />
    </div>
    <div class="h-[17px]" v-if="showError">
      <BaseErrorMessage v-if="meta.touched" :name="name" />
    </div>
  </div>
</template>
<script>
import { useField } from 'vee-validate'
import BaseLabel from './BaseLabel.vue'
import BaseField from './BaseField.vue'
import BaseErrorMessage from './BaseErrorMessage.vue'

export default {
  name: 'TextField',
  components: {
    BaseLabel,
    BaseField,
    BaseErrorMessage
  },
  data() {
    const { errors, value, meta } = useField(this.name)
    return {
      errors,
      value,
      meta
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    type: {
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
    },
    valueField: {
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
