<template>
  <header class="header">
    <span>Scrum Poker</span>
    <span v-if="isScrumPage">
      Developer Panel:
      <a target="_blank" :href="`http://localhost:8080/view-plan-as-developer/${sessionId}`">
        <small>http://localhost:8080/view-plan-as-developer/{{ sessionId }}</small>
      </a>
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
