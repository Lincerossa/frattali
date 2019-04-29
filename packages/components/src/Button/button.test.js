import React from 'react'
import { render, mount, shallow } from 'enzyme'

import Button from './index'

describe('<Button />', () => {
  it('Component should be rendered', () => {
    const CC = mount(<Button>button</Button>)
    expect(CC.exists()).toBe(true)
  })

  it('Component should be have a string as children', () => {
    const text = 'test string'
    const CC = mount(<Button>{text}</Button>)
    expect(CC.text()).toBe(text)
  })
})
