<template>
  <div class="mx-4 mt-5 flex max-w-[700px] flex-col md:mx-auto">
    <Form
      class="mb-5 flex w-full flex-col gap-y-5 border border-neutral-100 bg-white py-5 px-[15px] md:px-[30px]"
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="initData"
      v-slot="{ isSubmitting, values, errors, meta, setFieldValue }"
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
                onChangeBrand(values), setFieldValue('model', '')
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
                onChangeModel(values), setFieldValue('nickname', '')
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
            :bookmarked="bookmarked"
            @add-bookmark="addBookmark"
            @remove-bookmark="removeBookmark"
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
import CarService from '@/services/CarService.js'
import BookmarkService from '@/services/BookmarkService.js'
import PartItem from './component/PartItem.vue'
export default {
  name: 'DiagnoseView',
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
      brand: yup
        .object()
        .required('กรุณาเลือกยี่ห้อรถยนต์')
        .typeError('กรุณาเลือกยี่ห้อรถยนต์'),
      model: yup
        .object()
        .required('กรุณาเลือกรุ่นรถยนต์')
        .typeError('กรุณาเลือกรุ่นรถยนต์'),
      nickname: yup
        .object()
        .required('กรุณาเลือกโฉมรถยนต์')
        .typeError('กรุณาเลือกโฉมรถยนต์'),
      symptom: yup
        .string()
        .required('โปรดกรอกอาการที่พบ')
        .matches(/^[A-Za-z0-9ก-๙ ]+$/, 'กรุณาระบุอาการที่พบ')
    })
    return {
      schema,
      cars: [],
      models: [],
      nickname: [],
      parts: [],
      bookmarked: [],
      initData: {
        brand: '',
        model: '',
        nickname: '',
        symptom: ''
      }
    }
  },
  created() {
    CarService.getAllCars()
      .then((res) => {
        this.cars = res.data
      })
      .catch((err) => {
        console.log(err)
        this.$swal.fire({
          icon: 'error',
          title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
          text: 'โปรดลองอีกครั้งภายหลัง',
          confirmButtonColor: '#02b1f5',
          confirmButtonText: 'ตกลง'
        })
      })
    const user = JSON.parse(this.$store.getters.getCurrentUser)
    if (user.car) {
      this.initData = {
        brand: { code: user.car.brand, label: user.car.brand_th },
        model: { code: user.car.model, label: user.car.model_th },
        nickname: { code: user.car.nickname, label: user.car.nickname }
      }
    }
    BookmarkService.getBookmarkByUserId(user.id)
      .then((res) => {
        let products = res.data.products
        if (products && products.length) {
          this.bookmarked = products.map((item) => item.serial_no)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    brands() {
      return this.cars.map((car) => {
        return { code: car.brand, label: car.brand_th }
      })
    },
    getCurrentUser() {
      return JSON.parse(this.$store.getters.getCurrentUser)
    }
  },
  methods: {
    onSubmit(e) {
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'กำลังประมวลผล',
        showConfirmButton: false,
        position: 'top-end',
        timer: 2000
      })
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
                text: 'โปรดลองอีกครั้งภายหลัง',
                confirmButtonColor: '#02b1f5',
                confirmButtonText: 'ตกลง'
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
    },
    addBookmark(serial_no) {
      BookmarkService.addBookmark(this.getCurrentUser.id, serial_no)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            toast: true,
            title: 'เพิ่มรายการเรียบร้อยแล้ว',
            showConfirmButton: false,
            position: 'top-end',
            timer: 2000
          })
        })
        .catch((err) => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'เพิ่มรายการไม่สำเร็จ',
            showConfirmButton: false,
            position: 'top-end',
            timer: 2000
          })
        })
    },
    removeBookmark(serial_no) {
      BookmarkService.removeBookmark(this.getCurrentUser.id, serial_no)
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            toast: true,
            title: 'ลบรายการสำเร็จ',
            showConfirmButton: false,
            position: 'top-end',
            timer: 2000
          })
        })
        .catch((err) => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'ลบรายการไม่สำเร็จ',
            showConfirmButton: false,
            position: 'top-end',
            timer: 2000
          })
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
