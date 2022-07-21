<template lang="">
  <div class="mx-4 mt-5 flex max-w-[700px] flex-col gap-y-5 md:mx-auto">
    <HeaderText text="เข้าสู่ระบบ" />
    <Form>
      <div
        class="flex flex-col justify-center rounded-[10px] bg-primary-100 py-5 px-[10px] md:px-[30px]"
      >
        <div class="flex justify-center">
          <TextField
            class="px-1 sm:w-full md:w-[310px]"
            name="email"
            label="อีเมล"
            required
          />
        </div>
        <div class="flex flex-col">
          <div class="flex justify-center">
            <TextField
              class="px-1 sm:w-full md:w-[310px]"
              name="password"
              label="รหัสผ่าน"
              required
            />
          </div>
        </div>
        <div class="my-[15px] flex justify-center">
          <PrimaryButton type="submit" :isLoading="isSubmitting"
            >เข้าสู่ระบบ</PrimaryButton
          >
        </div>
        <div class="flex justify-center">
          <span class="mr-1 text-sm text-primary-900">ยังไม่มีบัญชี?</span>
          <span class="text-sm text-primary-700 underline underline-offset-2">
            ลงทะเบียน</span
          >
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import HeaderText from '@/components/form/HeaderText.vue'
import { Form } from 'vee-validate'
import TextField from '@/components/field/TextField.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'

export default {
  name: 'LoginForm',
  components: {
    HeaderText,
    Form,
    TextField,
    PrimaryButton
  }
}
</script>
