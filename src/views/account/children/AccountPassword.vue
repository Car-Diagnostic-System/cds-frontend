<template>
  <Form
    class="mx-[30px] my-[30px]"
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ isSubmitting, errors, meta }"
  >
    <HeaderText text="เปลี่ยนรหัสผ่าน" class="mb-5" />
    <div>
      <TextField
        type="password"
        name="password"
        label="รหัสผ่านเดิม"
        placeholder="********"
        required
      />
    </div>
    <div>
      <TextField
        type="password"
        name="newPassword"
        label="รหัสผ่านใหม่"
        placeholder="********"
        required
      />
    </div>
    <div>
      <TextField
        type="password"
        name="comfirmPassword"
        label="ยืนยันรหัสผ่านใหม่"
        placeholder="********"
        required
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
  </Form>
</template>
<script>
import HeaderText from '@/components/form/HeaderText.vue'
import TextField from '@/components/field/TextField.vue'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import { Form } from 'vee-validate'
import AuthService from '@/services/AuthService'

export default {
  name: 'AccountPasswordView',
  components: { HeaderText, TextField, PrimaryButton, Form },
  data() {
    const schema = yup.object().shape({
      password: yup
        .string()
        .required('กรุณากรอกรหัสผ่านเดิม')
        .typeError('กรุณากรอกรหัสผ่านเดิม'),
      newPassword: yup
        .string()
        .min(8)
        .minUppercase(1, 'รหัสผ่านต้องมีตัวอักษรตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
        .minLowercase(1, 'รหัสผ่านต้องมีตัวอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว')
        .required('กรุณาใส่รหัสผ่านใหม่'),
      comfirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'รหัสผ่านไม่ตรงกัน')
        .required('กรุณากรอกยืนยันรหัสผ่านใหม่')
        .typeError('กรุณากรอกยืนยันรหัสผ่านใหม่')
    })
    return {
      schema
    }
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  },
  methods: {
    onSubmit(e) {
      const data = {
        userId: this.getCurrentUser.id,
        oldPassword: e.password,
        newPassword: e.newPassword
      }
      this.$swal
        .fire({
          title: 'ต้องการเปลี่ยนรหัสผ่าน?',
          text: 'คุณสามารถแก้ไขได้ภายหลัง',
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
            AuthService.updatePasswordByUserId(data).then(() => {
              this.$swal
                .fire({
                  icon: 'success',
                  title: 'เปลี่ยนรหัสผ่านสำเร็จ',
                  text: 'โปรดเข้าสู่ระบบอีกครั้ง',
                  confirmButtonText: 'ตกลง',
                  confirmButtonColor: '#02b1f5',
                  allowEscapeKey: false,
                  allowOutsideClick: false,
                  reverseButtons: true
                })
                .then((res) => {
                  if (res.isConfirmed) {
                    AuthService.logout()
                    location.reload()
                  }
                })
            })
          }
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }
}
</script>
