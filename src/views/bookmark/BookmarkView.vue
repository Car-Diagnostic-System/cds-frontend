<template>
  <div class="mx-4 mt-5 flex max-w-[840px] flex-col md:mx-auto">
    <HeaderText text="รายการโปรด" />
    <div
      class="my-5 flex flex-wrap items-center justify-start md:flex-row"
      v-if="bookmarks.length"
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
    const userId = JSON.parse(this.$store.getters.getCurrentUser).id
    BookmarkService.getBookmarkByUserId(userId)
      .then((res) => {
        console.log(res)
        this.bookmarks = res.data.products
      })
      .catch((err) => {
        console.log(err)
        this.$swal.fire({
          icon: 'info',
          title: 'ไม่พบรายการโปรด',
          footer: `<a href="${ROUTE_PATH.DIAGNOSE}">คุณสามารถเพิ่มรายการโปรดได้ที่นี่</a>`,
          confirmButtonColor: '#02b1f5',
          confirmButtonText: 'ตกลง'
        })
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
          cancelButtonText: 'ยกเลิก'
        })
        .then((result) => {
          if (result.isConfirmed) {
            BookmarkService.removeBookmark(
              this.getCurrentUser().id,
              serial_no
            ).then(() => {
              this.$swal.fire({
                title: 'ลบรายการเสร็จสิ้น',
                text: 'คุณสามารถเพิ่มรายการได้อีกครั้งในภายหลัง',
                icon: 'success',
                confirmButtonColor: '#02b1f5',
                confirmButtonText: 'ตกลง'
              })
              this.bookmarks = this.bookmarks.filter((bookmark) => {
                return bookmark.serial_no !== serial_no
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
        <p><b>กลุ่มสินค้า: </b>${bookmark.item_group}</p>
        <p><b>รายละเอียดการประกอบ: </b>${bookmark.fitment_detail}</p>
        <p><b>ใช้สำหรับ:</b> ${bookmark.car_brand} ${bookmark.car_model} ${bookmark.nickname}</p>
        `,
        showConfirmButton: false,
        showCloseButton: true
      })
    },
    getCurrentUser() {
      return JSON.parse(this.$store.getters.getCurrentUser)
    }
  }
}
</script>
