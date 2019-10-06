import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', () => {
  const localVue = createLocalVue()

  it('renders title', () => {
    const label = 'Scrum Poker'
    const wrapper = shallowMount(Header, {
      localVue,
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.text()).toMatch(label)
  })

  it('renders developer link on scrum master page', () => {
    const wrapper = shallowMount(Header, {
      localVue,
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.contains(RouterLinkStub)).toBe(true)
    expect(wrapper.findAll(RouterLinkStub).at(1).text()).toEqual(expect.stringContaining('view-plan-as-developer/1'))
  })

  it('should not render developer link on developer page', () => {
    const wrapper = shallowMount(Header, {
      localVue,
      mocks: {
        $route: {
          name: 'ViewPlanAsDeveloper'
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findAll(RouterLinkStub).length).toEqual(1)
  })
})
