<template>
  <div>
    <PublicContent v-if="getRole === 'none'" />
    <MemberContent v-if="getRole === ROLE.MEMBER" />
  </div>
</template>

<script>
import PublicContent from './component/PublicContent.vue'
import MemberContent from './component/MemberContent.vue'
import ROLE from '@/constants/role'
export default {
  name: 'HomeView',
  components: {
    PublicContent,
    MemberContent
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
