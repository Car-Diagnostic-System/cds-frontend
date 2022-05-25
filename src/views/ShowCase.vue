<template>
  <AppLayout>
    <h1>Show Case</h1>
    <div
      class="w-full max-w-[640px] items-center rounded border-[1px] border-gray-200 p-4"
    >
      <Form @submit="onSubmit" :validation-schema="schema">
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
        <button>click</button>
      </Form>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.component.vue'
import CarService from '@/services/CarService'
import TextField from '@/components/field/TextField.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'ShowCase',
  components: {
    Form,
    AppLayout,
    TextField
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup.string().required('โปรดกรอกคำนำหน้า'),
      lastname: yup.string().required('โปรดกรอกชื่อ')
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
