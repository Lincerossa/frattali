import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Canvas from './index'

storiesOf('Canvas', module).add('with text', () => (
  <Canvas
    onClick={action('clicked')}
    width={500}
    height={400}
    lines={[]}
    useGetCenter={() => ({ center: { x: 200, y: 200 } })}
  >
    Hello Canvas
  </Canvas>
))
