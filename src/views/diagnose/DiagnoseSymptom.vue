<template>
  <div class="mx-4 mt-5 flex max-w-[700px] md:mx-auto">
    <Form
      class="flex w-full flex-col gap-y-5 border border-neutral-100 bg-white py-5 px-[15px] md:px-[30px]"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting, values, errors, meta, setFieldValue }"
      :initial-values="carInfo"
    >
      <HeaderText text="ประเมินอาการรถยนต์" />
      <div>
        <div class="gap-x-5 md:flex">
          <Dropdown
            class="w-full"
            name="brand"
            label="ยี่ห้อรถยนต์"
            placeholder="เลือกยี่ห้อรถยนต์"
            :options="brands"
            @change="
              () => {
                onChangeBrand(values), setFieldValue('model', {})
              }
            "
            required
          />
          <Dropdown
            class="w-full"
            name="model"
            label="รุ่นรถยนต์"
            placeholder="เลือกรุ่นรถยนต์"
            :options="models"
            :disabled="values.brand ? false : true"
            @change="
              () => {
                onChangeModel(values), setFieldValue('nickname', {})
              }
            "
            required
          />
        </div>
        <Dropdown
          name="nickname"
          label="โฉมรถยนต์"
          placeholder="เลือกโฉมรถยนต์"
          :options="nicknames"
          :disabled="values.model ? false : true"
          required
        />
        <TextField
          name="symptom"
          label="อาการที่พบ"
          placeholder="เช่น รถเลี้ยวมีเสียงดังกึกๆ"
          required
        />
        <div class="mt-[5px] flex justify-center">
          <PrimaryButton
            type="submit"
            :isLoading="isSubmitting"
            :click="
              () =>
                Object.keys(errors).length || !meta.touched
                  ? this.$swal.fire({
                      icon: 'error',
                      title: 'โปรดกรอกข้อมูลให้ครบถ้วน',
                      showConfirmButton: false,
                      timer: 2000
                    })
                  : null
            "
            >ค้นหา</PrimaryButton
          >
        </div>
      </div>
    </Form>
    <transition name="fade" mode="out-in">
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
    </transition>
  </div>
</template>
<script>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/field/TextField.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import HeaderText from '@/components/form/HeaderText.vue'
import SymptomService from '@/services/SymptomService.js'
import CarService from '@/services/CarService'
import PartItem from './component/PartItem.vue'
export default {
  name: 'DiagnoseSymptom',
  components: {
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
      symptom: yup
        .string()
        .required('โปรดกรอกอาการที่พบ')
        .matches(/^[A-Za-z0-9ก-๙ ]+$/, 'กรุณาระบุอาการที่พบ')
    })
    const { carInfo } = this.$store.getters.getCurrentUser
    return {
      schema,
      cars: [],
      models: [],
      nickname: [],
      parts: [],
      carInfo
    }
  },
  created() {
    CarService.getAllCars()
      .then((res) => {
        this.cars = res.data
      })
      .catch((e) => {
        console.log(e)
        this.$swal.fire({
          icon: 'error',
          title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
          text: 'โปรดลองอีกครั้งภายหลัง'
        })
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
      return new Promise((resolve) => {
        resolve(
          SymptomService.querySymptom(body)
            .then((res) => {
              this.parts = res.data
            })
            .catch(() => {
              this.$swal.fire({
                icon: 'error',
                title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
                text: 'โปรดลองอีกครั้งภายหลัง'
              })
            })
        )
      })
    },
    onChangeBrand(e) {
      this.models = this.cars
        .filter((car) => {
          return car.brand === e.brand.code
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
    onChangeModel(e) {
      this.nicknames = this.cars
        .filter((car) => {
          return car.brand === e.brand.code
        })[0]
        .model.filter((m) => m.model == e.model.code)
        .map((m) => {
          return { label: m.nickname }
        })
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
