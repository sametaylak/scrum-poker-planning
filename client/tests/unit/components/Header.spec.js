import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', () => {
  it('renders title', () => {
    const label = 'Scrum Poker'
    const wrapper = shallowMount(Header, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        }
      }
    })

    expect(wrapper.text()).toMatch(label)
  })

  it('renders developer link on scrum master page', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $route: {
          name: 'ViewPlanAsScrumMaster',
          params: { id: 1 }
        }
      }
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.find('a').text()).toEqual(expect.stringContaining('view-plan-as-developer/1'))
  })

  it('should not render developer link on developer page', () => {
    const wrapper = shallowMount(Header, {
      mocks: {
        $route: {
          name: 'ViewPlanAsDeveloper'
        }
      }
    })

    expect(wrapper.contains('a')).toBe(false)
  })
})
