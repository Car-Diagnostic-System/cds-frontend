<template>
  <nav
    class="flex min-h-[66px] justify-between bg-primary-400 py-6 px-5 text-[17px] leading-[17px] text-white md:px-7"
  >
    <!-- NOTE: desktop nav -->
    <div class="hidden flex-row gap-x-9 md:flex" @click="desktopMenu = false">
      <router-link
        class="text-white transition duration-300 ease-in-out hover:text-neutral-200"
        :to="ROUTE_PATH.HOME"
        ><img class="h-[17px] object-contain" src="@/assets/images/logo.png"
      /></router-link>
      <router-link
        class="text-white transition duration-300 ease-in-out hover:text-neutral-200"
        :to="ROUTE_PATH.DIAGNOSE"
        v-if="isAuthenticated && isUser"
        >ประเมินอาการรถยนต์</router-link
      >
      <router-link
        class="text-white transition duration-300 ease-in-out hover:text-neutral-200"
        :to="ROUTE_PATH.BOOKMARK"
        v-if="isAuthenticated && isUser"
        >รายการโปรด</router-link
      >
      <router-link
        class="text-white transition duration-300 ease-in-out hover:text-neutral-200"
        :to="ROUTE_PATH.INDEXING"
        v-if="isAuthenticated && isAdmin"
        >เพิ่มอาการรถยนต์</router-link
      >
    </div>

    <div
      class="hidden cursor-pointer flex-row rounded-md px-4 transition duration-300 ease-in-out hover:bg-primary-600 md:flex"
      v-if="isAuthenticated"
      @click="desktopMenu = !desktopMenu"
    >
      <span class="mr-2">{{ getUser }}</span>
      <img
        class="h-[20px] rounded-full object-contain"
        :src="getCurrentUser.imageProfile"
        v-if="getCurrentUser.imageProfile"
      />
      <img
        class="h-[20px] rounded-full object-contain"
        src="@/assets/images/no-profile.png"
        v-else
      />
    </div>
    <transition name="fadeHeight" mode="out-in">
      <div
        class="absolute right-9 top-[67px] z-50 hidden h-[100px] w-[300px] flex-col items-center gap-y-3 rounded-b-xl border bg-white text-lg md:flex"
        v-if="desktopMenu"
        @click="desktopMenu = !desktopMenu"
      >
        <div />
        <router-link
          class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
          :to="ROUTE_PATH.ACCOUNT"
          v-if="isAuthenticated"
          >ข้อมูลส่วนตัว</router-link
        >
        <!--         
        <router-link
          class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
          :to="ROUTE_PATH.INDEXING"
          v-if="isAuthenticated && isAdmin"
          >เพิ่มอาการรถยนต์</router-link
        > -->
        <span
          @click="logout"
          class="cursor-pointer text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
          v-if="isAuthenticated"
          >ออกจากระบบ</span
        >
      </div>
    </transition>

    <!-- NOTE: mobile nav -->
    <div
      class="flex flex-row items-center gap-x-9 md:hidden"
      @click="mobileMenu = false"
    >
      <router-link
        class="text-white transition duration-300 ease-in-out hover:text-neutral-200"
        :to="ROUTE_PATH.HOME"
        ><img class="h-5 object-contain" src="@/assets/images/logo.png"
      /></router-link>
    </div>
    <div
      class="block cursor-pointer rounded-full py-2 px-4 hover:bg-primary-600 md:hidden"
      @click="mobileMenu = !mobileMenu"
      v-if="isAuthenticated"
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-if="!mobileMenu"
      >
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-if="mobileMenu"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div v-if="!isAuthenticated">
      <router-link :to="ROUTE_PATH.LOGIN">เข้าสู่ระบบ</router-link>
    </div>
    <transition name="fadeHeight" mode="out-in">
      <div
        class="absolute left-0 top-[99px] z-50 flex h-full w-full flex-col items-center gap-y-5 border bg-white text-xl md:hidden"
        v-if="mobileMenu"
      >
        <div />
        <div @click="mobileMenu = !mobileMenu" v-if="isAuthenticated">
          <router-link
            class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
            :to="ROUTE_PATH.ACCOUNT"
            >ข้อมูลส่วนตัว</router-link
          >
        </div>
        <div @click="mobileMenu = !mobileMenu" v-if="isAuthenticated && isUser">
          <router-link
            class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
            :to="ROUTE_PATH.DIAGNOSE"
            >ประเมินอาการรถยนต์</router-link
          >
        </div>
        <div @click="mobileMenu = !mobileMenu" v-if="isAuthenticated && isUser">
          <router-link
            class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
            :to="ROUTE_PATH.BOOKMARK"
            >รายการโปรด</router-link
          >
        </div>
        <div
          @click="mobileMenu = !mobileMenu"
          v-if="isAuthenticated && isAdmin"
        >
          <router-link
            @click="mobileMenu = !mobileMenu"
            class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
            :to="ROUTE_PATH.INDEXING"
            >เพิ่มอาการรถยนต์</router-link
          >
        </div>
        <span
          @click="logout"
          class="text-primary-300 transition duration-300 ease-in-out hover:text-neutral-200"
          v-if="isAuthenticated"
          >ออกจากระบบ</span
        >
      </div>
    </transition>
  </nav>
</template>
<script>
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import ROLE from '@/constants/role.js'
export default {
  name: 'NavBar',
  data() {
    // const { firstname, lastname } = this.$store.getters.getCurrentUser
    return {
      ROUTE_PATH,
      mobileMenu: false,
      desktopMenu: false,
      firstname: 'John',
      lastname: 'Doe',
      ROLE
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getCurrentUser
    },
    isUser() {
      return this.$store.getters.getRole === ROLE.USER
    },
    isAdmin() {
      return this.$store.getters.getRole === ROLE.ADMIN
    },
    getUser() {
      return (
        JSON.parse(this.$store.getters.getCurrentUser).firstname +
        ' ' +
        JSON.parse(this.$store.getters.getCurrentUser).lastname
      )
    },
    getCurrentUser() {
      return JSON.parse(this.$store.getters.getCurrentUser)
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'ออกจากระบบเรียบร้อย',
        showConfirmButton: false,
        position: 'top-end',
        timer: 2000
      })
      setTimeout(() => {
        location.reload()
      }, 2000)
    }
  }
}
</script>
<style scoped>
nav .router-link-active,
nav .router-link-exact-active {
  @apply !text-primary-800;
}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.1s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
