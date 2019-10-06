import { shallowMount } from '@vue/test-utils'
import AddStoryList from '@/views/AddStoryList'

describe('AddStoryList.vue', () => {
  let pushFn = jest.fn()
  let wrapper
  let getters, actions

  beforeEach(() => {
    getters = {
      sessions: []
    }
    actions = {
      addSession: jest.fn()
    }

    wrapper = shallowMount(AddStoryList, {
      mocks: {
        $router: {
          push: pushFn
        },
        $axios: {
          post: () => ({
            data: {
              id: 1,
              sessionName: 'Session #1',
              numOfVoter: 3,
              stories: [
                {
                  storyName: 'Story 1'
                },
                {
                  storyName: 'Story 2'
                }
              ]
            }
          })
        },
        $store: {
          getters,
          actions
        }
      }
    })
  })

  it('should give require errors', () => {
    wrapper.find('button').trigger('click')

    expect(wrapper.vm.errors.length).not.toEqual(0)
    expect(wrapper.vm.errors).toEqual(expect.arrayContaining([
      'Session name is required!',
      'Number of Voter is required!',
      'Stories are required!'
    ]))
  })

  it('should give greater than zero error', () => {
    wrapper.vm.numOfVoter = '0'
    wrapper.find('button').trigger('click')

    expect(wrapper.vm.errors).toEqual(expect.arrayContaining([
      'Number of Voter should greater than zero!'
    ]))
  })

  it('should give only digits error', () => {
    wrapper.vm.numOfVoter = '0abc'
    wrapper.find('button').trigger('click')

    expect(wrapper.vm.errors).toEqual(expect.arrayContaining([
      'Number of Voter accepts only digits!'
    ]))
  })

  it('should start session', () => {
    wrapper.vm.addSession = jest.fn()
    wrapper.vm.sessionName = 'Session #1'
    wrapper.vm.numOfVoter = '3'
    wrapper.vm.storyTextarea = `
      Story 1
      Story 2
    `

    wrapper.find('button').trigger('click')
    expect(wrapper.vm.errors.length).toEqual(0)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.addSession).toHaveBeenCalled()
      expect(pushFn).toHaveBeenCalled()
      expect(pushFn).toHaveBeenCalledWith(
        {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        }
      )
    })
  })
})
