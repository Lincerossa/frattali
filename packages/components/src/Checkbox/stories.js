import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Checkbox from './index'

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox onClick={action()} />)
  .add('checked', () => <Checkbox checked onClick={action()} />)
  .add('with label and checked', () => (
    <Checkbox label="matto" checked onClick={action()} />
  ))
