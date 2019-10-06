<template>
  <div class="active-story">
    <fieldset>
      <legend>Active Story: {{ story.storyName }}</legend>
      <div class="points">
        <button
          :disabled="hasVoted"
          @click="vote(point)"
          class="btn"
          v-for="point in storyPoints"
          :key="point">
          {{ point }}
        </button>
      </div>
      <p>{{ hasVoted ? 'You Voted!!' : 'Please Vote!!' }}</p>
    </fieldset>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ActiveStory',
  props: {
    story: {
      type: Object,
      required: true
    },
    isScrumMaster: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      voted: false,
      storyPoints: [
        1, 2, 3, 5,
        8, 13, 21, 34,
        55, 89, 134
      ]
    }
  },
  computed: {
    ...mapGetters([
      'votes'
    ]),
    hasVoted () {
      return this.hasVotedAsScrumMaster || this.voted
    },
    hasVotedAsScrumMaster () {
      return !!this.votes.find(v => v.who === 1)
    }
  },
  watch: {
    story (newVal, oldVal) {
      if (newVal.id !== oldVal.id) {
        this.voted = false
      }
    }
  },
  methods: {
    ...mapActions([
      'addVote'
    ]),
    async vote (point) {
      let result
      try {
        if (this.isScrumMaster) {
          result = await this.$axios.post(`votes/${this.story.id}`, {
            storyId: this.story.id,
            who: 1,
            point
          })
        } else {
          result = await this.$axios.post(`votes/${this.story.id}`, {
            storyId: this.story.id,
            who: 0,
            point
          })
        }
        this.addVote(result.data)
        this.voted = true
      } catch (err) {
        alert(err.response.data.error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active-story {
  .points {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    button {
      margin: 4px;
      border: 1px solid $gray;
      border-radius: 4px;
      width: 40px;
      height: 40px;
    }
  }
  p {
    text-align: center;
  }
}
</style>
