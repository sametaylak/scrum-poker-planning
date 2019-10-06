import { shallowMount } from '@vue/test-utils'
import ViewPlan from '@/views/ViewPlan'
import StoryList from '@/components/StoryList'
import ActiveStory from '@/components/ActiveStory'
import ScrumMasterPanel from '@/components/ScrumMasterPanel'

describe('ViewPlan.vue', () => {
  let wrapper
  let getters

  beforeEach(() => {
    getters = {
      sessions: [],
      sessionById: jest.fn()
    }

    wrapper = shallowMount(ViewPlan, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: {
            id: 1
          }
        },
        $axios: {
          get: () => ({
            data: []
          })
        },
        $store: {
          getters
        }
      }
    })
  })

  it('should have 3 component', () => {
    expect(wrapper.find(StoryList)).toBeTruthy()
    expect(wrapper.find(ActiveStory)).toBeTruthy()
    expect(wrapper.find(ScrumMasterPanel)).toBeTruthy()
  })

  it('should hide ScrumMasterPanel if user is a developer', () => {
    wrapper.vm.$route.name = 'ViewPlanAsDeveloper'

    expect(wrapper.find(StoryList).exists()).toBe(true)
    expect(wrapper.find(ActiveStory).exists()).toBe(false)
    expect(wrapper.find(ScrumMasterPanel).exists()).toBe(false)
  })

  it('should call sessionById if sessions length greater than zero', () => {
    const sessions = [
      {
        id: 1,
        sessionName: 'Session D',
        stories: []
      }
    ]
    const sessionById = jest.fn(id => sessions.find(s => s.id === id))
    const w = shallowMount(ViewPlan, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        },
        $store: {
          getters: {
            sessions,
            sessionById
          }
        }
      }
    })

    expect(sessionById).toHaveBeenCalled()
  })

  it('should call fetchSession if there is no session', () => {
    const fetchSession = jest.fn()
    const w = shallowMount(ViewPlan, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        },
        $store: {
          getters: {
            sessions: [],
          }
        },
      },
      methods: {
        fetchSession
      }
    })

    expect(fetchSession).toHaveBeenCalled()
  })

  it('should return numOfVoter', () => {
    const g = {
      sessions: [
        {
          id: 1,
          sessionName: 'Session #1',
          numOfVoter: 3,
          stories: []
        }
      ],
      sessionById: jest.fn(id => g.sessions.find(s => s.id === id))
    }
    const w = shallowMount(ViewPlan, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        },
        $store: {
          getters: g
        }
      }
    })

    expect(w.vm.numOfVoter).toEqual(3)
    w.vm.session.numOfVoter = undefined
    expect(w.vm.numOfVoter).toEqual(0)
  })

  it('should return activeStory', () => {
    const g = {
      sessions: [
        {
          id: 1,
          sessionName: 'Session #1',
          numOfVoter: 3,
          stories: [
            {
              id: 1,
              storyName: 'Story #1',
              status: 0
            }
          ]
        }
      ],
      sessionById: jest.fn(id => g.sessions.find(s => s.id === id))
    }
    const w = shallowMount(ViewPlan, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        },
        $store: {
          getters: g
        }
      }
    })

    expect(w.vm.activeStory).toEqual({
      id: 1,
      storyName: 'Story #1',
      status: 0
    })
  })
})
