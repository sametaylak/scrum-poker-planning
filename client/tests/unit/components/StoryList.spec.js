import { shallowMount } from '@vue/test-utils'
import StoryList from '@/components/StoryList'

jest.useFakeTimers()

describe('StoryList.vue', () => {
  it('renders title', () => {
    const stubbedFn = jest.fn()
    const sessionId = 1
    const wrapper = shallowMount(StoryList, {
      methods: {
        fetchStories: stubbedFn
      },
      propsData: {
        sessionId
      }
    })

    expect(wrapper.props().sessionId).toEqual(sessionId)
  })

  it('should call fetchStories on mounted', () => {
    const stubbedFn = jest.fn()
    const sessionId = 1
    shallowMount(StoryList, {
      methods: {
        fetchStories: stubbedFn
      },
      propsData: {
        sessionId
      }
    })

    expect(stubbedFn).toHaveBeenCalledTimes(1)
  })

  it('should set data from axios', () => {
    const sessionId = 1
    const wrapper = shallowMount(StoryList, {
      mocks: {
        $axios: {
          get: () => ({
            data: [
              {}, {}
            ]
          })
        }
      },
      propsData: {
        sessionId
      }
    })

    expect(wrapper.vm.stories.length).toBe(0)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.stories.length).toBe(2)
    })
  })

  it('should show data from axios', () => {
    const sessionId = 1
    const wrapper = shallowMount(StoryList, {
      mocks: {
        $axios: {
          get: () => ({
            data: [
              {
                id: 1,
                storyName: 'Story #1',
                status: 0
              },
              {
                id: 2,
                storyName: 'Story #2',
                status: 1
              }
            ]
          })
        }
      },
      propsData: {
        sessionId
      }
    })

    wrapper.vm.$nextTick(() => {
      const firstStory = wrapper.findAll('table tbody tr').at(0)
      expect(firstStory.findAll('td').at(0).text()).toBe('Story #1')
      expect(firstStory.findAll('td').at(1).text()).toBe('-')
      expect(firstStory.findAll('td').at(2).text()).toBe('Active')

      const secondStory = wrapper.findAll('table tbody tr').at(1)
      expect(secondStory.findAll('td').at(0).text()).toBe('Story #2')
      expect(secondStory.findAll('td').at(1).text()).toBe('-')
      expect(secondStory.findAll('td').at(2).text()).toBe('Not Voted')
    })
  })

  it('should call fetchStories every 2000ms', () => {
    const stubbedFn = jest.fn()
    const sessionId = 1
    shallowMount(StoryList, {
      mocks: {
        $axios: {
          get: () => ({
            data: [
              {}, {}
            ]
          })
        }
      },
      methods: {
        fetchStories: stubbedFn
      },
      propsData: {
        sessionId
      }
    })

    expect(stubbedFn).toHaveBeenCalledTimes(1)
    jest.runTimersToTime(2000)
    expect(stubbedFn).toHaveBeenCalledTimes(2)
  })
})
