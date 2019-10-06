import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessions: [],
    votes: []
  },
  getters: {
    sessions: state => state.sessions,
    sessionById: state => id => state.sessions.find(s => s.id === id),
    votes: state => state.votes,
  },
  mutations: {
    ADD_VOTE (state, vote) {
      state.votes.push(vote)
    },
    SET_VOTES (state, votes) {
      state.votes = votes
    },
    SET_SESSIONS (state, sessions) {
      state.sessions = sessions
    },
    ADD_SESSION (state, session) {
      state.sessions.push(session)
    }
  },
  actions: {
    addVote ({ commit }, vote) {
      commit('ADD_VOTE', vote)
    },
    setVotes ({ commit }, votes) {
      commit('SET_VOTES', votes)
    },
    setSessions ({ commit }, sessions) {
      commit('SET_SESSIONS', sessions)
    },
    addSession ({ commit }, session) {
      commit('ADD_SESSION', session)
    }
  }
})
