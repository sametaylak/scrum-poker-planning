import { shallowMount } from '@vue/test-utils'
import ScrumMasterPanel from '@/components/ScrumMasterPanel'

jest.useFakeTimers()

describe('ScrumMasterPanel.vue', () => {
  let wrapper
  let story = {
    id: 1,
    sessionId: 1,
    storyName: 'Story #1'
  }
  let numOfVoter = 5
  let getters, actions, fetchVotes

  beforeEach(() => {
    fetchVotes = jest.fn()

    getters = {
      votes: []
    }
    actions = {
      setVotes: jest.fn(votes => getters.votes = votes)
    }

    wrapper = shallowMount(ScrumMasterPanel, {
      methods: {
        fetchVotes
      },
      mocks: {
        $store: {
          getters,
          actions
        },
        $axios: {
          get: () => ({
            data: []
          }),
          post: () => ({
            data: {}
          })
        }
      },
      propsData: {
        story,
        numOfVoter
      }
    })
  })

  it('renders title', () => {
    expect(wrapper.find('legend').text()).toEqual('Scrum Master Panel')
    expect(wrapper.find('p').text()).toEqual('Story #1 is active')
    expect(wrapper.find('button').attributes('disabled')).toBeTruthy()
  })

  it('renders default voters if there no votes', () => {
    expect(wrapper.findAll('span').length).toEqual(numOfVoter)
    expect(wrapper.findAll('span').at(0).text()).toEqual('Voter 1: Not Voted')
  })

  it('renders votes', () => {
    expect(wrapper.findAll('span').length).toEqual(numOfVoter)
    expect(wrapper.findAll('span').at(0).text()).toEqual('Voter 1: Not Voted')

    getters.votes.push({
      id: 1,
      storyId: story.id,
      point: 5,
      who: 1
    })

    expect(wrapper.findAll('span').at(0).text()).toEqual('Scrum Master: Voted')

    getters.votes.push({
      id: 2,
      storyId: story.id,
      point: 3,
      who: 0
    })

    expect(wrapper.findAll('span').at(1).text()).toEqual('Voter 2: Voted')
  })

  it('should enable button if all votes given', () => {
    for (let i = 1; i <= numOfVoter; i++) {
      getters.votes.push({
        id: i,
        storyId: story.id,
        point: i,
        who: i === 1 ? 1 : 0
      })
    }

    expect(wrapper.findAll('span').at(0).text()).toEqual('Scrum Master: 1')
    expect(wrapper.findAll('span').at(1).text()).toEqual('Voter 2: 2')
    expect(wrapper.findAll('span').at(2).text()).toEqual('Voter 3: 3')
    expect(wrapper.findAll('span').at(3).text()).toEqual('Voter 4: 4')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('should end voting', () => {
    for (let i = 1; i <= numOfVoter; i++) {
      getters.votes.push({
        id: i,
        storyId: story.id,
        point: i,
        who: i === 1 ? 1 : 0
      })
    }

    wrapper.find('button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().ended).toBeTruthy()
    })
  })

  it('should call fetchVotes every 2000ms', () => {
    jest.runTimersToTime(2000)
    expect(fetchVotes).toHaveBeenCalledTimes(2)
    jest.runTimersToTime(2000)
    expect(fetchVotes).toHaveBeenCalledTimes(3)
  })
})
