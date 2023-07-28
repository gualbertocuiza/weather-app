import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchInput from '../searchInput.vue'

describe('weather card component', () => {
  const wrapper = mount(SearchInput)

  it('should filter by cities', async () => {
    const searchInput = wrapper.find('input')
    await searchInput.setValue('San')

    expect(wrapper.html()).toContain('Santa Cruz, Bolivia')
    expect(wrapper.html()).toContain('San Francisco, California')

    await searchInput.setValue('New')

    expect(wrapper.html()).toContain('New York, New York')
    expect(wrapper.html()).toContain('New Rochelle, New York')
  })

  it('should emit setCity event to parent component', async () => {
    const searchInput = wrapper.find('input')
    await searchInput.setValue('Santa Cruz')
    await wrapper.find('li').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('setCity')
    expect(wrapper.emitted('setCity')).toEqual([['Santa Cruz, Bolivia']])
  })
})
