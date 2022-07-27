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
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      />
    </div>
    <div class="h-[15px]" v-if="showError">
      <BaseErrorMessage v-if="meta.touched" :name="name" />
    </div>
  </div>
</template>
<script>
import { useField } from 'vee-validate'
import BaseLabel from './base/BaseLabel.vue'
import BaseField from './base/BaseField.vue'
import BaseErrorMessage from './base/BaseErrorMessage.vue'

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

<style>
.vs__dropdown-toggle {
  @apply h-[41px] !rounded-lg !border-neutral-500 !p-0 !placeholder-neutral-400  hover:border-neutral-500;
}
.error .vs__dropdown-toggle {
  @apply !border-error-500 !bg-error-100 !text-error-400 placeholder-error-400 focus:!border-error-500 focus:!ring-2 focus:!ring-error-200;
}
.vs--disabled .vs__dropdown-toggle {
  @apply !cursor-default !border-neutral-100 !bg-neutral-100;
}
.vs--disabled .vs__dropdown-toggle .vs__open-indicator {
  @apply !cursor-default !bg-neutral-100;
}
.vs__selected-options {
  @apply h-full !p-0;
}
.vs__search {
  @apply !m-0 !py-0 !px-4 !text-sm !leading-[17px] text-neutral-900 !placeholder-neutral-400;
}
.error .vs__dropdown-toggle .vs__search {
  @apply !placeholder-error-400;
}
.vs--disabled .vs__dropdown-toggle .vs__search {
  @apply !cursor-default !bg-neutral-100 !placeholder-neutral-500;
}
.vs__actions {
  @apply !px-4 !py-0;
}
.vs__selected {
  @apply !m-0 h-full !px-4 !text-sm !leading-[17px];
}
.vs--open > div {
  @apply !border-primary-500 ring-2 ring-primary-200;
}
.error .vs__dropdown-toggle {
  @apply !ring-error-200 focus:!border-error-500 focus:!ring-2;
}
.vs--open > ul {
  border: 1px solid #5c61f3;
  box-shadow: 0px 8px 15px 0px rgba(92, 97, 243, 0.2);
  @apply z-10 mt-2 rounded-lg py-0;
}
.vs--open > ul > li {
  height: 36px !important;
  display: flex !important;
  align-items: center !important;
}
.vs__dropdown-option {
  @apply !h-6 !py-0 !px-4 !text-sm leading-[17px] !text-neutral-600 hover:bg-primary-100 hover:!text-black;
}
.vs__dropdown-option--highlight {
  @apply !bg-primary-100 !text-black;
}
</style>
