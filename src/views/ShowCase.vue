<template>
  <AppLayout>
    <h1>Show Case</h1>
    <div
      class="w-full max-w-[640px] items-center rounded border-[1px] border-gray-200 p-4"
    >
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ isSubmitting, values }"
      >
        {{ values }}
        <UploadField
          name="imageProfile"
          label="อัพรูป"
          :accept="['image/jpeg', 'image/png']"
        />
        <TextField
          type="text"
          name="firstname"
          placeholder="ชื่อ"
          label="ชื่อ"
        />
        <TextField
          type="text"
          name="lastname"
          placeholder="ชื่อss"
          label="ชื่อss"
        />
        <Dropdown
          label="คำนำหน้า"
          name="prefixName"
          placeholder="คำนำหน้า"
          :options="[123, 123, 123]"
          required
        />
        <PrimaryButton
          actionType="submit"
          type="submit"
          :isLoading="isSubmitting"
        />
        <button>click</button>
      </Form>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue'
import CarService from '@/services/CarService'
import TextField from '@/components/field/TextField.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import { Form } from 'vee-validate'
import UploadField from '@/components/field/UploadField.vue'
import * as yup from 'yup'
export default {
  name: 'ShowCase',
  components: {
    Form,
    AppLayout,
    TextField,
    Dropdown,
    UploadField,
    PrimaryButton
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup.string().required('โปรดกรอกคำนำหน้า'),
      lastname: yup.string().required('โปรดกรอกชื่อ'),
      prefixName: yup.string().required('โปรดกรอกคำนำหน้า')
    })
    return {
      schema,
      cars: [],
      selected: {
        brand: '',
        model: '',
        nickname: ''
      }
    }
  },
  created() {
    CarService.getAllCars().then((res) => {
      this.cars = res.data
    })
  },
  computed: {
    brands() {
      return Object.keys(this.cars)
    },
    models() {
      if (this.selected.brand) {
        let model = this.cars[this.selected.brand].map((car) => {
          return { model: car.model, model_th: car.model_th }
        })
        model = [...new Set(model.map((item) => item.model))]
        console.log(model)

        return model
      }
      return []
    },
    nicknames() {
      if (this.selected.model) {
        return this.cars[this.selected.brand].filter((model) => {
          return model.model === this.selected.model
        })
      }
      return []
    }
  },
  methods: {
    onClick() {
      alert(JSON.stringify(this.selected))
    }
  }
}
</script>
