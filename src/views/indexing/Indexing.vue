<template>
  <div class="mx-4 mt-5 flex max-w-[700px] flex-col gap-y-5 md:mx-auto">
    <Form
      class="flex w-full flex-col gap-y-5 border border-neutral-100 bg-white py-5 px-[15px] md:px-[30px]"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting, errors, meta }"
    >
      <HeaderText text="เพิ่มอาการรถยนต์" />
      <div>
        <div class="flex w-full flex-col items-start gap-y-3">
          <h5 class="text-2xl font-medium leading-[29px]">ข้อกำหนด</h5>
          <ul
            class="flex list-disc flex-col gap-y-5 pl-7 text-xl leading-[22px]"
          >
            <li>
              <span> ไฟล์ต้องประกอบด้วย 2 คอลัมน์ ได้แก่ </span>
              <ul class="flex list-disc flex-col pl-7 text-lg leading-[22px]">
                <li>คอลัมน์ A: parts คือ อะไหล่รถยนต์</li>
                <li>
                  คอลัมน์ B: symptoms คือ อาการที่เกิดขึ้นหากอะไหล่จาก คอลัมน์ A
                  ชำรุด
                </li>
              </ul>
            </li>
            <li>ไฟล์ต้องมีขนาดน้อยกว่าเท่ากับ 5 MB</li>
            <li>ไฟล์ต้องมีข้อมูลอย่างน้อย 1 แถว (ไม่นับชื่อคอลัมน์)</li>
            <li>ไฟล์ต้องมีนามสกุล .xlsx</li>
          </ul>
          <div class="text-xl leading-[22px]">
            <span>สามารถ download file format ได้</span>
            <a
              href="https://docs.google.com/spreadsheets/d/1uVdnch2vC72flzPqio1G70IDAPMeSwFI/edit?usp=sharing&ouid=106338400906252482063&rtpof=true&sd=true"
              class="ml-2 cursor-pointer text-primary-700 underline hover:text-primary-900"
              target="_blank"
              >ที่นี่</a
            >
          </div>
        </div>
        <div class="mt-2 w-full max-w-[342px]">
          <FileField name="file" accept=".xlsx" />
        </div>
        <div class="flex w-full justify-center py-[10px]">
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
    const SUPPORTED_FORMATS = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    const FILE_SIZE = 5000000
    const schema = yup.object().shape({
      file: yup
        .mixed()
        .required('กรุณาเลือกไฟล์')
        .test(
          'fileSize',
          'ไฟล์มีขนาดเกิน 5MB',
          (value) => value && value[0].size <= FILE_SIZE
        )
        .test('fileType', 'รองรับประเภทของไฟล์ .xlsx เท่านั้น', (value) => {
          return value && SUPPORTED_FORMATS.includes(value[0].type)
        })
    })
    return {
      schema
    }
  },
  methods: {
    onSubmit(e) {
      return new Promise((resolve) => {
        resolve(
          SymptomService.indexing(e.file[0])
            .then(() => {
              this.$swal.fire({
                icon: 'success',
                title: 'อัพโหลดไฟล์สำเร็จ',
                text: 'ระบบจะส่งอีเมลเมื่อกระบวนการเสร็จสิ้น'
              })
            })
            .catch((e) => {
              if (e.response.status == 400) {
                this.$swal.fire({
                  icon: 'error',
                  title: 'มีบางอย่างผิดพลาด',
                  text: 'โปรดตรวจสอบไฟล์ตามข้อกำหนดอีกครั้ง'
                })
              } else {
                this.$swal.fire({
                  icon: 'error',
                  title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
                  text: 'โปรดลองอีกครั้งภายหลัง'
                })
              }
            })
        )
      })
    }
  }
}
</script>
