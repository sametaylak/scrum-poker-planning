<template>
  <div class="add-story-list">
    <div class="container">
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="flex m-top-10">
        <InputText class="flex-primary" type="text" label="Session Name" v-model="sessionName" />
        <InputText class="flex-primary m-left-10" type="number" label="Number of Voters" v-model="numOfVoter" />
      </div>
      <p>Paste your story List (Each line will be converted as a story)</p>
      <textarea v-model="storyTextarea" />
      <button @click="startSession" class="btn primary f-right m-top-10">Start Session</button>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/InputText'
import { mapActions } from 'vuex'

export default {
  name: 'AddStoryList',
  components: {
    InputText
  },
  data () {
    return {
      errors: [],
      sessionName: '',
      numOfVoter: '',
      storyTextarea: ''
    }
  },
  methods: {
    ...mapActions([
      'addSession'
    ]),
    validateForm () {
      this.errors = []

      if (this.sessionName.trim() === '') {
        this.errors.push('Session name is required!')
      }
      if (this.numOfVoter === '') {
        this.errors.push('Number of Voter is required!')
      }
      if (this.numOfVoter === '0') {
        this.errors.push('Number of Voter should greater than zero!')
      }
      if (!/^[0-9]*$/.exec(this.numOfVoter)) {
        this.errors.push('Number of Voter accepts only digits!')
      }
      if (this.storyTextarea.trim() === '') {
        this.errors.push('Stories are required!')
      }
    },
    async startSession () {
      const stories = this.storyTextarea
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => ({ storyName: s }))

      this.validateForm()
      if (this.errors.length > 0) return

      const session = await this.$axios.post('sessions', {
        sessionName: this.sessionName,
        numOfVoter: this.numOfVoter,
        stories
      })
      this.addSession(session.data)

      this.$router.push({ name: 'ViewPlanAsScrumMaster', params: { id: session.data.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-story-list {
  textarea {
    width: 100%;
    height: 200px;
    resize: none;
  }
  .errors {
    background: $red;
    color: $white;
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
  }
}
</style>
