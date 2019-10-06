<template>
  <header class="header">
    <span>
      <router-link to="/">Scrum Poker</router-link>
    </span>
    <span v-if="isScrumPage">
      Developer Panel:
      <router-link target="_blank" :to="{ name: 'ViewPlanAsDeveloper', params: { id: sessionId } }">
        {{ `view-plan-as-developer/${sessionId}` }}
      </router-link>
    </span>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    sessionId () {
      return this.$route.params.id
    },
    isScrumPage () {
      return this.$route.name === 'ViewPlanAsScrumMaster'
    }
  }
}
</script>

<style lang="scss" scoped>
header.header {
  background: $black;
  color: $white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  a {
    color: $white;
  }
}
</style>
