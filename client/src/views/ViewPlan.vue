<template>
  <div class="view-plan">
    <div class="container">
      <div class="flex m-top-20">
        <StoryList
          class="flex-primary m-right-10"
          :sessionId="sessionId" />
        <ActiveStory
          v-if="activeStory"
          class="m-right-10"
          :story="activeStory"
          :isScrumMaster="isScrumMaster" />
        <ScrumMasterPanel
          @ended="fetchSession"
          v-if="isScrumMaster && activeStory"
          :story="activeStory"
          :numOfVoter="+numOfVoter" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StoryList from '@/components/StoryList'
import ActiveStory from '@/components/ActiveStory'
import ScrumMasterPanel from '@/components/ScrumMasterPanel'

export default {
  name: 'ViewPlan',
  components: {
    StoryList,
    ActiveStory,
    ScrumMasterPanel
  },
  data () {
    return {
      session: {}
    }
  },
  computed: {
    ...mapGetters([
      'sessions',
      'sessionById'
    ]),
    isScrumMaster () {
      return this.$route.name === 'ViewPlanAsScrumMaster'
    },
    sessionId () {
      return this.$route.params.id
    },
    activeStory () {
      return (this.session.stories || []).find(s => s.status === 0)
    },
    numOfVoter () {
      return this.session.numOfVoter || 0
    }
  },
  methods: {
    async fetchSession () {
      const session = await this.$axios.get(`sessions/${this.sessionId}`)
      this.session = session.data
    }
  },
  beforeMount () {
    if (this.sessions.length > 0) {
      this.session = this.sessionById(this.sessionId)
      return
    }
    this.fetchSession()
  }
}
</script>

<style lang="scss" scoped>
.view-plan {
}
</style>
