<template>
  <AppLayout>
    <div class="mx-4 flex max-w-[700px] flex-col gap-y-5 md:mx-auto">
      <div />
      <HeaderText text="ประเมินอาการรถยนต์" />
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ isSubmitting, values }"
      >
        <div
          class="w-full rounded-[10px] bg-primary-100 py-5 px-[15px] md:px-[30px]"
        >
          <div class="gap-x-5 md:flex">
            <Dropdown
              class="w-full"
              name="brand"
              label="ยี่ห้อรถยนต์"
              placeholder="เลือกยี่ห้อรถยนต์"
              :options="brands"
              @change="onChangeBrand"
              required
            />
            <Dropdown
              class="w-full"
              name="model"
              label="รุ่นรถยนต์"
              placeholder="เลือกรุ่นรถยนต์"
              :options="models"
              @change="onChangeModel(values.brand, values.model)"
              required
            />
          </div>
          <Dropdown
            name="nickname"
            label="โฉมรถยนต์"
            placeholder="เลือกโฉมรถยนต์"
            :options="nicknames"
            required
          />
          <TextField
            name="symptom"
            label="อาการที่พบ"
            placeholder="เช่น รถเลี้ยวมีเสียงดังกึกๆ"
            required
          />
          <div class="mt-[5px] flex justify-center">
            <PrimaryButton type="submit" :isLoading="isSubmitting"
              >ค้นหา</PrimaryButton
            >
          </div>
        </div>
      </Form>
      <div class="mb-[55px]" v-if="parts.length">
        <HeaderText
          class="mb-5 flex !text-2xl"
          text="อะไหล่ที่คาดว่าชำรุด"
          ref="product"
        />
        <div class="flex flex-col gap-y-5">
          <PartItem
            v-for="(part, idx) in parts"
            :key="idx"
            :part="part"
            :rank="idx + 1"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/field/TextField.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import HeaderText from '@/components/form/HeaderText.vue'
import ProductService from '@/services/ProductService'
import CarService from '@/services/CarService'
import PartItem from './component/PartItem.vue'
export default {
  name: 'DiagnoseSymptom',
  components: {
    AppLayout,
    Form,
    TextField,
    Dropdown,
    HeaderText,
    PrimaryButton,
    PartItem
  },
  data() {
    const schema = yup.object().shape({
      brand: yup.object().required('กรุณาเลือกยี่ห้อรถยนต์'),
      model: yup.object().required('กรุณาเลือกรุ่นรถยนต์'),
      nickname: yup.object().required('กรุณาเลือกโฉมรถยนต์'),
      symptom: yup.string().required('โปรดกรอกอาการที่พบ')
    })
    return {
      schema,
      cars: [],
      models: [],
      nickname: [],
      parts: []
    }
  },
  created() {
    CarService.getAllCars().then((res) => {
      this.cars = res.data
    })
  },
  computed: {
    brands() {
      return this.cars.map((car) => {
        return { code: car.brand, label: car.brand_th }
      })
    }
  },
  methods: {
    onSubmit(e) {
      this.parts = []
      const body = {
        brand: e.brand.code,
        model: e.model.code,
        nickname: e.nickname.label,
        symptom: e.symptom
      }
      ProductService.querySymptom(body).then((res) => {
        this.parts = res.data
      })
    },
    onChangeBrand(e) {
      this.models = this.cars
        .filter((car) => {
          return car.brand === e.code
        })[0]
        .model.map((model) => {
          return { code: model.model, label: model.model_th }
        })
        .reduce((unique, o) => {
          if (
            !unique.some(
              (obj) => obj.label === o.label && obj.value === o.value
            )
          ) {
            unique.push(o)
          }
          return unique
        }, [])
    },
    onChangeModel(brand, model) {
      this.nicknames = this.cars
        .filter((car) => {
          return car.brand === brand.code
        })[0]
        .model.filter((m) => m.model == model.code)
        .map((m) => {
          return { label: m.nickname }
        })
    }
  }
}
</script>
