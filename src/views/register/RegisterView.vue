<template>
  <div class="mx-4 mt-5 flex max-w-[700px] flex-col md:mx-auto">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting, values, errors, meta, setFieldValue }"
      class="mb-5 flex w-full flex-col gap-y-5 border-neutral-100 bg-white py-5 px-[15px] md:px-[30px]"
    >
      <HeaderText text="ลงทะเบียน" />
      <div>
        <UploadField
          name="imageProfile"
          label="รูปโปรไฟล์"
          :accept="['image/jpeg', 'image/png']"
        />
        <div class="gap-x-5 md:flex">
          <TextField
            name="firstname"
            label="ชื่อจริง"
            placeholder="ชื่อจริง"
            required
          />
          <TextField
            name="lastname"
            label="นามสกุล"
            placeholder="นามสกุล"
            required
          />
        </div>
        <div>
          <TextField name="email" label="อีเมล" placeholder="อีเมล" required />
        </div>
        <div class="gap-x-5 md:flex">
          <TextField
            type="password"
            name="password"
            label="รหัสผ่าน"
            placeholder="รหัสผ่าน"
            required
          />
          <TextField
            type="password"
            name="passwordConfirmation"
            label="ยืนยันรหัสผ่าน"
            placeholder="ยืนยันรหัสผ่าน"
            required
          />
        </div>
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
          />
          <Dropdown
            class="w-full"
            name="model"
            label="รุ่นรถยนต์"
            placeholder="เลือกรุ่นรถยนต์"
            :disabled="values.brand ? false : true"
            :options="models"
            @change="
              () => {
                onChangeModel(values), setFieldValue('nickname', '')
              }
            "
            :required="values.brand ? true : false"
          />
        </div>
        <Dropdown
          name="nickname"
          label="โฉมรถยนต์"
          placeholder="เลือกโฉมรถยนต์"
          :options="nicknames"
          :disabled="values.model ? false : true"
          :required="values.brand ? true : false"
        />
      </div>
      <div class="my-[15px] flex justify-center">
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
          >บันทึก</PrimaryButton
        >
      </div>
      <div class="flex justify-center">
        <span class="mr-1 text-sm text-primary-900">มีบัญชีอยู่แล้ว?</span>
        <router-link
          :to="ROUTE_PATH.LOGIN"
          class="text-sm text-primary-700 underline underline-offset-2"
          >เข้าสู่ระบบ</router-link
        >
      </div>
    </Form>
  </div>
</template>
<script>
import HeaderText from '@/components/form/HeaderText.vue'
import { Form } from 'vee-validate'
import TextField from '@/components/field/TextField.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import * as yup from 'yup'
import CarService from '@/services/CarService'
import ROUTE_PATH from '@/constants/router'
import AuthService from '@/services/AuthService'
import BucketService from '@/services/BucketService'
import YupPassword from 'yup-password'
import UploadField from '@/components/field/UploadField.vue'
YupPassword(yup)

export default {
  name: 'RegisterView',
  components: {
    HeaderText,
    Form,
    TextField,
    Dropdown,
    PrimaryButton,
    UploadField
  },
  data() {
    yup.addMethod(yup.string, 'checkEmailValid', function (errorMessage) {
      return this.test('check-email-valid', errorMessage, function (value) {
        const { path, createError } = this
        return new Promise((resolve, reject) => {
          if (typeof value != 'undefined' && value.length > 9) {
            AuthService.checkEmailExist(value)
              .then((res) => {
                if (!res.data.email) {
                  resolve(true)
                } else {
                  reject(createError({ path, errorMessage }))
                }
              })
              .catch(() => {
                reject(false)
              })
          } else {
            reject(false)
          }
        })
      })
    })
    const schema = yup.object().shape({
      firstname: yup.string().required('กรุณาใส่ชื่อจริง'),
      lastname: yup.string().required('กรุณาใส่นามสกุล'),
      email: yup
        .string()
        .required('กรุณาใส่อีเมล')
        .email('กรุณาใส่อีเมลที่ถูกต้อง')
        .checkEmailValid('อีเมลนี้ถูกใช้งานแล้ว'),
      password: yup
        .string()
        .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร')
        .minUppercase(1, 'รหัสผ่านต้องมีตัวอักษรตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
        .minLowercase(1, 'รหัสผ่านต้องมีตัวอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว')
        .required('กรุณาใส่รหัสผ่าน'),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
        .required('กรุณายืนยันรหัสผ่าน'),
      brand: yup.object().typeError('กรุณาเลือกยี่ห้อรถยนต์'),
      model: yup
        .object()
        .typeError('กรุณาเลือกรุ่นรถยนต์')
        .when('brand', {
          is: (brand) => brand && brand.length,
          then: yup.object().required('กรุณาเลือกรุ่นรถยนต์')
        }),
      nickname: yup
        .object()
        .typeError('กรุณาเลือกโฉมรถยนต์')
        .when('brand', {
          is: (brand) => brand && brand.length,
          then: yup.object().required('กรุณาเลือกรุ่นรถยนต์')
        })
    })
    return {
      schema,
      cars: [],
      models: [],
      nickname: [],
      parts: [],
      ROUTE_PATH
    }
  },
  created() {
    CarService.getAllCars()
      .then((res) => {
        this.cars = res.data
      })
      .catch(() => {
        this.$swal.fire({
          icon: 'error',
          title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
          text: 'โปรดลองอีกครั้งภายหลัง',
          confirmButtonColor: '#02b1f5',
          confirmButtonText: 'ตกลง',
          reverseButtons: true
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
    onSubmit(user) {
      this.$swal
        .fire({
          title: 'ต้องยืนยันข้อมูลการลงทะเบียนหรือไม่?',
          text: 'คุณสามารถแก้ไขข้อมูลได้ภายหลัง',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#02b1f5',
          cancelButtonColor: '#ff4327',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          reverseButtons: true
        })
        .then((res) => {
          if (res.isConfirmed) {
            // NOTE: this is mapping the data to the correct format
            if (user.imageProfile) {
              BucketService.uploadFile(user.imageProfile).then((res) => {
                const data = {
                  imageProfile: res.data,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: user.password,
                  car: user.nickname ? user.nickname.carId : null
                }
                AuthService.register(data)
                  .then(() => {
                    this.$swal.fire({
                      icon: 'success',
                      title: 'สมัครสมาชิกสำเร็จ',
                      showConfirmButton: false,
                      timer: 2000
                    })
                    setTimeout(() => {
                      this.$router.push(ROUTE_PATH.LOGIN)
                    }, 2000)
                  })
                  .catch(() => {
                    this.$swal.fire({
                      icon: 'error',
                      title: 'สมัครสมาชิกไม่สำเร็จ',
                      showConfirmButton: false,
                      timer: 2000
                    })
                  })
              })
            } else {
              const data = {
                imageProfile: null,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                car: user.nickname ? user.nickname.carId : null
              }
              AuthService.register(data)
                .then(() => {
                  this.$swal.fire({
                    icon: 'success',
                    title: 'สมัครสมาชิกสำเร็จ',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  setTimeout(() => {
                    this.$router.push(ROUTE_PATH.LOGIN)
                  }, 2000)
                })
                .catch(() => {
                  this.$swal.fire({
                    icon: 'error',
                    title: 'สมัครสมาชิกไม่สำเร็จ',
                    showConfirmButton: false,
                    timer: 2000
                  })
                })
            }
          }
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
          return { label: m.nickname, carId: m.id }
        })
    }
  }
}
</script>
