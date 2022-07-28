<template>
  <div>
    <PublicContent v-if="getRole === 'none'" />
    <UserContent v-if="getRole === ROLE.USER" />
    <UserContent v-if="getRole === ROLE.MEMBER" />
  </div>
</template>

<script>
import PublicContent from './component/PublicContent.vue'
import UserContent from './component/UserContent.vue'
import ROLE from '@/constants/role'
export default {
  name: 'HomeView',
  components: {
    PublicContent,
    UserContent
  },
  data() {
    return {
      ROLE
    }
  },
  computed: {
    getRole() {
      return this.$store.getters.getRole || 'none'
    }
  }
}
</script>
