<template>
  <div class="mx-4 mt-5 flex max-w-[840px] flex-col md:mx-auto">
    <HeaderText text="รายการโปรด" />
    <div
      class="my-5 flex flex-wrap items-center justify-start md:flex-row"
      v-if="bookmarks && bookmarks.length"
    >
      <BookmarkItem
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        @remove-bookmark="removeBookmark"
        @click="onClickBookmark"
      />
    </div>
    <h2 class="mx-auto text-error-500" v-else>ยังไม่มีการเพิ่มรายการโปรด</h2>
  </div>
</template>
<script>
import HeaderText from '@/components/form/HeaderText.vue'
import BookmarkItem from '@/views/bookmark/component/BookmarkItem.vue'
import BookmarkService from '@/services/BookmarkService'
import ROUTE_PATH from '@/constants/router'
import AuthService from '@/services/AuthService'
export default {
  name: 'BookmarkView',
  components: {
    HeaderText,
    BookmarkItem
  },
  data() {
    return {
      bookmarks: []
    }
  },
  created() {
    const userId = this.$store.getters.getCurrentUser.id
    BookmarkService.getBookmarkByUserId(userId)
      .then((res) => {
        if (res.data.message) {
          this.$swal.fire({
            icon: 'info',
            title: 'ไม่พบรายการโปรด',
            footer: `<u><a href="${ROUTE_PATH.DIAGNOSE}">สามารถเพิ่มรายการโปรดได้หลังจาก ประเมินอาการรถยนต์</a></u>`,
            confirmButtonColor: '#02b1f5',
            confirmButtonText: 'ตกลง',
            reverseButtons: true
          })
        } else {
          this.bookmarks = res.data
        }
        this.bookmarks = res.data.products
      })
      .catch((err) => {
        if (err.response.status === 403) {
          this.$swal
            .fire({
              icon: 'error',
              title: 'โทเคนของคุณไม่สามารถเข้าใช้งานได้',
              text: 'โปรดลองเข้าสู่ระบบอีกครั้ง',
              confirmButtonColor: '#02b1f5',
              confirmButtonText: 'ตกลง',
              reverseButtons: true
            })
            .then(() => {
              AuthService.logout()
              location.reload()
            })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ',
            text: 'โปรดลองอีกครั้งภายหลัง',
            confirmButtonColor: '#02b1f5',
            confirmButtonText: 'ตกลง',
            reverseButtons: true
          })
        }
      })
  },
  methods: {
    removeBookmark(serial_no) {
      this.$swal
        .fire({
          title: 'ต้องการลบรายการนี้?',
          text: 'คุณสามารถเพิ่มรายการได้อีกครั้งในภายหลัง',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#02b1f5',
          cancelButtonColor: '#ff4327',
          confirmButtonText: 'ลบ',
          cancelButtonText: 'ยกเลิก',
          reverseButtons: true
        })
        .then((result) => {
          if (result.isConfirmed) {
            BookmarkService.removeBookmark(this.getCurrentUser().id, serial_no)
              .then(() => {
                this.$swal.fire({
                  title: 'ลบรายการเสร็จสิ้น',
                  text: 'คุณสามารถเพิ่มรายการได้อีกครั้งในภายหลัง',
                  icon: 'success',
                  confirmButtonColor: '#02b1f5',
                  confirmButtonText: 'ตกลง',
                  reverseButtons: true
                })
                this.bookmarks = this.bookmarks.filter((bookmark) => {
                  return bookmark.serial_no !== serial_no
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
                  timer: 2000,
                  timerProgressBar: true
                })
              })
          }
        })
    },
    onClickBookmark(bookmark) {
      this.$swal.fire({
        title: `<strong>${bookmark.item_name}</strong>`,
        html: `
        <p><b>ยี่ห้อ: </b>${bookmark.brand}</p>
        <p><b>หมายเลขซีเรียล: </b>${bookmark.serial_no}</p>
        <p><b>กลุ่มสินค้า: </b>${
          bookmark.item_group ? bookmark.item_group : '-'
        }</p>
        <p><b>รายละเอียดการประกอบ: </b>${
          bookmark.fitment_detail ? bookmark.fitment_detail : '-'
        }</p>
        <p><b>ใช้สำหรับรถยนต์ :</b> ${
          bookmark.car_brand || bookmark.car_model || bookmark.nickname
            ? `${bookmark.car_brand} ${bookmark.car_model} ${bookmark.nickname}`
            : '-'
        } </p>`,
        showConfirmButton: false,
        showCloseButton: true
      })
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>
