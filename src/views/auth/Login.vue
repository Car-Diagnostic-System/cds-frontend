<template>
  <div class="mx-auto mt-5 flex max-w-[350px] flex-col">
    <Form
      class="flex flex-col items-center gap-y-5 bg-white py-9 px-[40px]"
      @submit="handleLogin"
      :validation-schema="schema"
    >
      <HeaderText text="เข้าสู่ระบบ" />
      <div class="w-full">
        <TextField
          class="max-w-[310px]"
          name="email"
          label="อีเมล"
          placeholder="johndoe@mail.com"
          required
        />
        <TextField
          class="max-w-[310px]"
          name="password"
          label="รหัสผ่าน"
          placeholder="********"
          required
        />
      </div>
      <PrimaryButton type="submit" :isLoading="isSubmitting"
        >เข้าสู่ระบบ</PrimaryButton
      >
      <div class="flex justify-center">
        <span class="mr-1 text-sm text-primary-900">ยังไม่มีบัญชี?</span>
        <!-- NOTE: this span below must change to router-link to routing -->
        <span class="text-sm text-primary-700 underline underline-offset-2">
          ลงทะเบียน</span
        >
      </div>
    </Form>
  </div>
</template>

<script>
import HeaderText from '@/components/form/HeaderText.vue'
import { Form } from 'vee-validate'
import TextField from '@/components/field/TextField.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import * as yup from 'yup'
import AuthService from '@/services/AuthService'
import ROUTE_PATH from '@/constants/router'

export default {
  name: 'LoginForm',
  components: {
    HeaderText,
    Form,
    TextField,
    PrimaryButton
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required('กรุณาใส่อีเมล'),
      password: yup.string().required('กรุณาใส่รหัสผ่าน')
    })
    return {
      loading: false,
      message: '',
      schema
    }
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          console.log(user)
          this.$router.push(ROUTE_PATH.HOME)
        })
        .catch(() => {
          this.message = 'Could not login'
        })
    }
  }
}
</script>
