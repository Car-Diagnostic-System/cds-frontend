<template>
  <div>
    <BaseLabel :label="label" :required="required" :helping="helping" />
    <UploadDropzone
      :uploader="uploader"
      :options="options"
      :on-update="onFileUploaded"
      height="250px"
    />
  </div>
</template>
<script>
import { Uploader } from 'uploader'
import { UploadDropzone } from '@upload-io/vue-uploader'
import BaseLabel from './BaseLabel.vue'
import { useField } from 'vee-validate'

// Create one instance per app.
const uploader = new Uploader({ apiKey: 'free' })
// NOTE: line below is accept xlsx
//  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
export default {
  name: 'UploadField',
  components: {
    UploadDropzone,
    BaseLabel
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
    }
  },
  data() {
    const options = {
      styles: {
        colors: {
          primary: '#02b1f5',
          active: '#074e73',
          focus: '#0071aa'
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
    const { setValue } = useField(props.name)
    const onFileUploaded = (files) => {
      if (files.length === 0) {
        setValue(null)
      } else {
        setValue(files[0].originalFile.file)
      }
    }
    return {
      onFileUploaded
    }
  }
}
</script>
