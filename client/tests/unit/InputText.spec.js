import { shallowMount } from '@vue/test-utils'
import InputText from '@/components/InputText'

describe('InputText.vue', () => {
  it('renders input with label', () => {
    const label = 'First Name'
    const wrapper = shallowMount(InputText, {
      propsData: { label }
    })

    expect(wrapper.text()).toMatch(label)
    expect(wrapper.contains('input')).toBe(true)
  })

  it('should emit input when typing', () => {
    const label = 'First Name'
    const wrapper = shallowMount(InputText, {
      propsData: { label }
    })

    wrapper.find('input').setValue('Samet Aylak')
    expect(wrapper.emitted().input[0][0]).toEqual('Samet Aylak')
  })
})
