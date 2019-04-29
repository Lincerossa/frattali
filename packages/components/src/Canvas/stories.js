import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Canvas from './index'

const defaultState = {
  lines: [
    {
      color: 'white',
      points: [],
      divisions: 50,
      thickness: 1,
    },
  ],
}

storiesOf('Canvas', module).add('with text', () => (
  <Canvas
    onClick={action('clicked')}
    width={1500}
    height={1400}
    lines={defaultState.lines}
    useGetCenter={() => ({ center: { x: 200, y: 200 } })}
  >
    Hello Canvas
  </Canvas>
))
