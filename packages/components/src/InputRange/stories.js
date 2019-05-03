import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InputRange from './index'

storiesOf('InputRange', module)
  .add('default', () => (
    <InputRange min={1} max={10} value={4} onChange={action(console.log())} />
  ))
  .add('with label (on a dark background)', () => (
    <InputRange
      label="label of the input range"
      min={1}
      max={10}
      value={4}
      onChange={action(console.log())}
    />
  ))
