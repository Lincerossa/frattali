import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Canvas from './index'
import SizeMe from '../Sizeme'
const defaultState = {
  lines: [
    {
      color: 'white',
      points: Array.from({ length: 20 }, (index, e) => ({
        x: 0,
        y: e * 4 + 30,
      })),
      divisions: 50,
      thickness: 1,
    },
  ],
}

storiesOf('Canvas', module).add('Default', () => (
  <Canvas onClick={action('clicked')} lines={defaultState.lines} />
))
