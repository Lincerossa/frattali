import React from 'react'
import { mount, shallow } from 'enzyme'

import Button from './index'

describe('<Button />', () => {
  it('Component should be rendered', () => {
    const tree = mount(<Button>button</Button>)
    expect(tree.exists()).toBe(true)
  })

  it('Component should be have a string as children', () => {
    const tree = mount(<Button>test string</Button>)
    expect(tree.text()).toBe('test string')
  })

  it('Simulate the click event', () => {
    const Foo = jest.fn().mockReturnValue('fired function')

    const tree = shallow(<Button onClick={Foo} />)
    const fnPassedAsProp = tree.prop('onClick')()

    expect(Foo).toBeCalled()
    expect(fnPassedAsProp).toBe('fired function')
  })
})
