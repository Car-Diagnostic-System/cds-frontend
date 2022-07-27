<template>
  <div class="flex w-full flex-col">
    <BaseLabel :label="label" :required="required" :helping="helping" />
    <div class="md:mx-9">
      <UploadDropzone
        :uploader="uploader"
        :options="options"
        :on-update="onFileUploaded"
        height="250px"
      />
    </div>
    <div class="h-[15px] md:mx-9" v-if="showError">
      <BaseErrorMessage v-if="meta.touched" :name="name" />
    </div>
  </div>
</template>
<script>
import { Uploader } from 'uploader'
import { UploadDropzone } from '@upload-io/vue-uploader'
import BaseLabel from './base/BaseLabel.vue'
import { useField } from 'vee-validate'
import BaseErrorMessage from './base/BaseErrorMessage.vue'

// NOTE: Create one instance per app.
const uploader = new Uploader({ apiKey: 'free' })

export default {
  name: 'UploadField',
  components: {
    UploadDropzone,
    BaseLabel,
    BaseErrorMessage
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
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
    accept: {
      type: Array,
      required: true
    },
    showError: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    const options = {
      styles: {
        colors: {
          primary: '#76d9ff',
          active: '#0071aa',
          focus: '#02b1f5'
        },
        fontSizes: {
          base: 16
        }
      },
      multi: false,
      maxFileSizeBytes: 5 * 1024 * 1024,
      mimeTypes: this.accept,
      layout: 'modal', // "modal" | "inline" (i.e. to create a dropzone)
      container: 'body' // Parent element to render the widget in.
    }
    return {
      uploader,
      options
    }
  },
  setup(props) {
    const { errors, value, meta, setValue } = useField(props.name)
    const onFileUploaded = (files) => {
      if (files.length === 0) {
        setValue(null)
      } else {
        setValue(files[0].originalFile.file)
      }
    }
    return {
      onFileUploaded,
      errors,
      value,
      meta
    }
  }
}
</script>
