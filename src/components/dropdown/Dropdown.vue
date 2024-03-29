<template>
  <div>
    <BaseLabel :label="label" :required="required" :helping="helping" />
    <Field type="text" :name="name" v-slot="{ field }">
      <v-select
        v-bind="field"
        :class="{ error: errors.length && meta.touched }"
        :name="name"
        :options="options"
        :placeholder="placeholder"
        :clearable="false"
        transition="none"
        :disabled="disabled"
      >
        <template v-slot:option="option">
          <div class="flex w-full items-center">
            <span class="w-full" v-if="!option.code">{{ option.label }}</span>
            <span class="w-full" v-else
              >{{ option.label }} ({{ option.code }})</span
            >
          </div>
        </template>
      </v-select>
    </Field>
    <div class="h-[15px]" v-if="showError">
      <BaseErrorMessage v-if="meta.touched" :name="name" />
    </div>
  </div>
</template>
<script>
import BaseLabel from '../field/base/BaseLabel.vue'
import BaseErrorMessage from '../field/base/BaseErrorMessage'
import { Field, useField } from 'vee-validate'
export default {
  name: 'DropDown',
  components: {
    BaseLabel,
    BaseErrorMessage,
    Field
    // CheckIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
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
    showError: {
      type: Boolean,
      required: false,
      default: true
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    helping: {
      type: String,
      required: false
    },
    disabled: {
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
  },
  watch: {
    value(newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>
<style>
.vs__dropdown-toggle {
  @apply h-[41px] !rounded-none !border-x-0 !border-t-0 !bg-white !p-0 !placeholder-neutral-400;
}
.error .vs__dropdown-toggle {
  @apply !border-error-500 !bg-error-100 !text-error-400 placeholder-error-400 transition duration-300 ease-in-out focus:!border-error-500 focus:!ring-2 focus:!ring-error-200;
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
  @apply !bg-primary-50 !ring-0;
}

.error .vs__dropdown-toggle {
  @apply !ring-error-200 transition duration-300 ease-in-out focus:!border-error-500 focus:!ring-2;
}

.vs--open > ul {
  @apply z-10 mt-2 rounded-none !border !border-neutral-100 py-0;
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
