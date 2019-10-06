<template>
  <div class="story-list">
    <span>Story List</span>
    <table border="1">
      <thead>
        <tr>
          <td>Story</td>
          <td>Story Point</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="story in stories" :key="story.id">
          <td>{{ story.storyName }}</td>
          <td>{{ story.storyPoint || '-' }}</td>
          <td>{{ storyStatus(story.status) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StoryList',
  props: {
    sessionId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      stories: [],
      activeStory: null
    }
  },
  methods: {
    storyStatus (status) {
      if (status === 1) return 'Not Voted'
      else if (status === 2) return 'Voted'
      return 'Active'
    },
    async fetchStories () {
      const stories = await this.$axios.get(`stories/${this.sessionId}`)
      this.stories = stories.data

      const newActiveStory = this.stories.find(s => s.status === 0)
      if (this.activeStory && newActiveStory && this.activeStory.id !== newActiveStory.id) {
        this.$emit('activeStoryChanged')
      }
      this.activeStory = newActiveStory
    }
  },
  async mounted () {
    this.fetchStories()
    setInterval(() => {
      this.fetchStories()
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.story-list {
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      td {
        padding: 4px 8px;
      }
    }
  }
}
</style>
