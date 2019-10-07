<template>
  <div class="scrum-master-panel">
    <fieldset>
      <legend>Scrum Master Panel</legend>
      <p>{{ story.storyName }} is active</p>
      <span v-for="voteIdx in numOfVoter" :key="voteIdx">
        {{ voterText(voteIdx) }}: {{ voteText(voteIdx) }}
      </span>
      <InputText type="number" class="m-top-10" label="Final Score" v-model="finalScore" />
      <button :disabled="!isDone" @click="endVoting" class="btn primary m-top-10">
        End Voting for {{ story.storyName }}
      </button>
    </fieldset>
  </div>
</template>

<script>
import InputText from '@/components/InputText'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ScrumMasterPanel',
  components: {
    InputText
  },
  props: {
    story: {
      type: Object,
      required: true
    },
    numOfVoter: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      fetchInterval: null,
      finalScore: 0
    }
  },
  computed: {
    ...mapGetters([
      'votes'
    ]),
    isDone () {
      return this.votes.length >= this.numOfVoter
    }
  },
  methods: {
    ...mapActions([
      'setVotes'
    ]),
    async endVoting () {
      if (!/^[1-9][0-9]*$/.exec(this.finalScore)) {
        alert('Invalid final score!')
        return
      }

      await this.$axios.post(`end/${this.story.sessionId}/${this.story.id}`, {
        point: this.finalScore
      })
      this.finalScore = 0
      this.$emit('ended')
    },
    async fetchVotes () {
      const votes = await this.$axios.get(`votes/${this.story.id}`)
      this.setVotes(votes.data)
    },
    voterText (voteIdx) {
      return (this.votes[voteIdx - 1] || {}).who === 1 ? 'Scrum Master' : `Voter ${voteIdx}`
    },
    voteText (voteIdx) {
      const votePoint = (this.votes[voteIdx - 1] || {}).point

      if (!this.isDone && votePoint) {
        return 'Voted'
      }

      return votePoint || 'Not Voted'
    }
  },
  mounted () {
    this.fetchVotes()
    this.fetchInterval = setInterval(() => {
      this.fetchVotes()
    }, 2000)
  },
  destroyed () {
    clearInterval(this.fetchInterval)
  }
}
</script>

<style lang="scss" scoped>
.scrum-master-panel {
  span {
    display: block;
  }
  .btn.primary {
    width: 100%;
  }
}
</style>
