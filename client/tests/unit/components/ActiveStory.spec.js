import { shallowMount } from '@vue/test-utils'
import ActiveStory from '@/components/ActiveStory'

describe('ActiveStory.vue', () => {
  let wrapper
  let isScrumMaster = true
  let getters, actions

  beforeEach(() => {
    getters = {
      votes: []
    }
    actions = {
      addVote: jest.fn(vote => getters.votes.push(vote))
    }
    
    wrapper = shallowMount(ActiveStory, {
      mocks: {
        $axios: {
          post: () => ({
            data: {
              storyId: 1,
              point: 1,
              who: isScrumMaster ? 1 : 0
            }
          })
        },
        $store: {
          getters,
          actions
        }
      },
      propsData: {
        isScrumMaster,
        story: {
          id: 1,
          storyName: 'Story #1',
          status: 0
        }
      }
    })
  })

  it('renders title', () => {
    expect(wrapper.find('legend').text()).toMatch('Active Story: Story #1')
  })

  it('should list points', () => {
    expect(wrapper.find('.points button').length).toBe(wrapper.vm.storyPoints.lenth)
  })

  it('should change text when i vote', () => {
    wrapper.vm.addVote = actions.addVote

    const firstPoint = wrapper.findAll('.points button').at(0)
    firstPoint.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(firstPoint.attributes('disabled')).toBeTruthy()
      expect(wrapper.find('p').text()).toBe('You Voted!!')
    })
  })

  it('should call vote method on point clicked', () => {
    wrapper.vm.vote = jest.fn()

    const firstPoint = wrapper.findAll('.points button').at(0)
    firstPoint.trigger('click')

    expect(wrapper.vm.vote).toBeCalledWith(1)
  })

  it('should return who 1 if scrum master voted', () => {
    wrapper.vm.addVote = actions.addVote

    const firstPoint = wrapper.findAll('.points button').at(0)
    firstPoint.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(getters.votes[0].who).toBe(1)
    })
  })

  it('should return who 0 if developer voted', () => {
    isScrumMaster = false
    wrapper.vm.addVote = actions.addVote

    const firstPoint = wrapper.findAll('.points button').at(0)
    firstPoint.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(getters.votes[0].who).toBe(0)
    })
  })

  it('should reset if story changed', () => {
    wrapper.vm.voted = true
    wrapper.setProps({
      story: {
        id: 2,
        storyName: 'Story #2',
        status: 0
      }
    })
    expect(wrapper.vm.voted).toEqual(false)
  })
})
