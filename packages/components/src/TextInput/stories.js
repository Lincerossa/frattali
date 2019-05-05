import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextInput from './index'

storiesOf('TextInput', module)
  .add('default', () => <TextInput onChange={action()} />)
  .add('with label', () => <TextInput onChange={action()} label="my label" />)
