<template>
  <div class="mx-4 flex max-w-[700px] flex-col gap-y-5 md:mx-auto">
    <div />
    <HeaderText text="เพิ่มอาการรถยนต์" />
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting }"
    >
      <div
        class="flex w-full flex-col items-start gap-y-[10px] rounded-[10px] bg-primary-100 py-5 px-[15px] md:px-[30px]"
      >
        <div class="flex w-full flex-col items-start gap-y-3">
          <h5 class="text-2xl font-bold leading-[29px]">ข้อกำหนด</h5>
          <p class="text-xl leading-[22px]">
            ประเภทของไฟล์ ต้องเป็น xlsx ซึ่งประกอบด้วย 2 columns คือ
          </p>
          <ul
            class="flex list-disc flex-col items-start pl-7 text-lg leading-[22px]"
          >
            <li>parts คือ อะไหล่รถยนต์</li>
            <li>symptoms คือ อาการที่เกิดขึ้นหากอะไหล่จาก ข้อ a. ชำรุด</li>
          </ul>

          <div class="text-xl leading-[22px]">
            <span>สามารถ download file format ได้</span>
            <a
              href="../../assets/files/indexing_format.xlsx"
              class="ml-2 cursor-pointer text-primary-700 underline hover:text-primary-900"
              download
              >ที่นี่</a
            >
          </div>
        </div>
        <div class="w-full max-w-[342px]">
          <FileField name="file" />
        </div>

        <div class="flex w-full justify-center py-[10px]">
          <PrimaryButton type="submit" :isLoading="isSubmitting"
            >อัพโหลด</PrimaryButton
          >
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import HeaderText from '@/components/form/HeaderText.vue'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import FileField from '@/components/field/FileField'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import SymptomService from '@/services/SymptomService.js'
export default {
  name: 'IndexingView',
  components: {
    HeaderText,
    Form,
    PrimaryButton,
    FileField
  },
  data() {
    const schema = yup.object().shape({
      file: yup.mixed().required('กรุณาเลือกไฟล์')
    })
    return {
      schema
    }
  },
  methods: {
    onSubmit(e) {
      SymptomService.indexing(e.file[0])
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
