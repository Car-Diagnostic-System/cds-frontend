<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ values, errors, setFieldValue }"
    :initial-values="initData"
    class="relative mx-[30px] my-5 py-[10px]"
  >
    <HeaderText text="ข้อมูลส่วนตัว" />
    <div class="flex h-[300px] items-center justify-center">
      <img
        v-if="isEdit && values.imageProfile"
        :src="values.imageProfile"
        class="my-5 h-52 w-52 rounded-full border-2 object-contain md:h-56 md:w-56"
        alt="avatar"
      />
      <img
        v-if="isEdit && !values.imageProfile"
        src="@/assets/images/no-profile.png"
        class="my-5 h-52 w-52 rounded-full border-2 object-contain md:h-56 md:w-56"
        alt="avatar"
      />

      <UploadField
        v-if="!isEdit"
        name="imageProfile"
        label="รูปโปรไฟล์"
        :accept="['image/jpeg', 'image/png']"
      />
    </div>
    <div class="gap-x-5 md:flex">
      <TextField
        name="firstname"
        label="ชื่อจริง"
        placeholder="ชื่อจริง"
        :disabled="isEdit"
        required
      />
      <TextField
        name="lastname"
        label="นามสกุล"
        placeholder="นามสกุล"
        :disabled="isEdit"
        required
      />
    </div>
    <div>
      <TextField
        name="email"
        label="อีเมล"
        placeholder="อีเมล"
        :disabled="isEdit"
        required
      />
    </div>
    <div v-if="getRole === ROLE.USER">
      <div class="gap-x-5 md:flex">
        <Dropdown
          class="w-full"
          name="brand"
          label="ยี่ห้อรถยนต์"
          placeholder="เลือกยี่ห้อรถยนต์"
          :options="brands"
          :disabled="isEdit"
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
          :disabled="isEdit"
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
        :disabled="isEdit"
        :required="values.brand ? true : false"
      />
    </div>
    <span
      class="absolute right-0 top-0 cursor-pointer"
      v-if="isEdit"
      @click="isEdit = !isEdit"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.25 6.25H8C6.61929 6.25 5.5 7.36929 5.5 8.75V22.5C5.5 23.8807 6.61929 25 8 25H21.75C23.1307 25 24.25 23.8807 24.25 22.5V16.25M22.4822 4.48223C23.4585 3.50592 25.0415 3.50592 26.0178 4.48223C26.9941 5.45854 26.9941 7.04146 26.0178 8.01777L15.2855 18.75H11.75L11.75 15.2145L22.4822 4.48223Z"
          stroke="#006696"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <div class="my-[15px] flex justify-center">
      <PrimaryButton
        v-if="!isEdit"
        type="submit"
        :isLoading="isSubmitting"
        :click="
          () =>
            Object.keys(errors).length
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
  </Form>
</template>

<script>
import HeaderText from '@/components/form/HeaderText.vue'
import TextField from '@/components/field/TextField.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService'
import CarService from '@/services/CarService'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import UploadField from '@/components/field/UploadField.vue'
import ROLE from '@/constants/role'

export default {
  name: 'AccountInformationView',
  components: {
    HeaderText,
    TextField,
    Dropdown,
    Form,
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
                if (
                  !res.data.email ||
                  value === JSON.parse(localStorage.getItem('user')).email
                ) {
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
      isSubmitting: false,
      isEdit: true,
      cars: [],
      models: [],
      nickname: [],
      parts: [],
      initData: {
        firstname: '',
        lastname: '',
        email: '',
        brand: {},
        model: {},
        nickname: {}
      },
      ROLE
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
          confirmButtonText: 'ตกลง'
        })
      })
    const user = JSON.parse(this.$store.getters.getCurrentUser)
    this.initData = {
      imageProfile: user.imageProfile,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      brand: user.car ? { code: user.car.brand, label: user.car.brand_th } : {},
      model: user.car ? { code: user.car.model, label: user.car.model_th } : {},
      nickname: user.car
        ? {
            code: user.car.nickname,
            label: user.car.nickname,
            carId: user.car.id
          }
        : {}
    }
  },
  computed: {
    brands() {
      return this.cars.map((car) => {
        return { code: car.brand, label: car.brand_th }
      })
    },
    getRole() {
      return this.$store.getters.getRole
    }
  },
  methods: {
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
    },
    onSubmit(user) {
      this.$swal
        .fire({
          title: 'ต้งอการยืนยันข้อมูลหรือไม่?',
          text: 'คุณสามารถแก้ไขข้อมูลได้ภายหลัง',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#02b1f5',
          cancelButtonColor: '#ff4327',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.isSubmitting = true
            let imageProfile = JSON.parse(
              this.$store.getters.getCurrentUser
            ).imageProfile
            if (user.imageProfile !== imageProfile) {
              AuthService.uploadFile(user.imageProfile)
                .then((res) => {
                  const data = {
                    userId: JSON.parse(this.$store.getters.getCurrentUser).id,
                    imageProfile: res.data,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    car: Object.keys(user.nickname).length
                      ? user.nickname.carId
                      : null
                  }
                  AuthService.updateUserById(data)
                    .then(() => {
                      this.$swal.fire({
                        icon: 'success',
                        title: 'อัพเดทข้อมูลสำเร็จ',
                        showConfirmButton: false
                      })
                      AuthService.getUserInfo(
                        JSON.parse(this.$store.getters.getCurrentUser).id
                      ).then((res) => {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        setTimeout(() => {
                          location.reload()
                        }, 2000)
                      })
                    })
                    .catch((e) => {
                      console.log(e)
                      this.$swal.fire({
                        icon: 'error',
                        title: 'อัพเดทข้อมูลไม่สำเร็จ'
                      })
                    })
                })
                .catch((err) => {
                  console.log('upload error: ', err)
                })
            } else {
              const data = {
                userId: JSON.parse(this.$store.getters.getCurrentUser).id,
                imageProfile: imageProfile,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                car: Object.keys(user.nickname).length
                  ? user.nickname.carId
                  : null
              }
              console.log(data)
              AuthService.updateUserById(data)
                .then(() => {
                  this.$swal.fire({
                    icon: 'success',
                    title: 'อัพเดทข้อมูลสำเร็จ',
                    showConfirmButton: false
                  })
                  AuthService.getUserInfo(
                    JSON.parse(this.$store.getters.getCurrentUser).id
                  ).then((res) => {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    setTimeout(() => {
                      location.reload()
                    }, 2000)
                  })
                })
                .catch((e) => {
                  console.log(e)
                  this.$swal.fire({
                    icon: 'error',
                    title: 'อัพเดทข้อมูลไม่สำเร็จ',
                    showConfirmButton: false
                  })
                })
            }
          }
        })
    }
  }
}
</script>
