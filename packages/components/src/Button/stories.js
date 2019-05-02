import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './index'

storiesOf('Button', module)
  .add('default', () => <Button onClick={action('clicked')}>M</Button>)
  .add('with backgroundImage', () => (
    <Button
      onClick={action('clicked')}
      backgroundImage="https://www.unsplash.it/300/600"
    >
      M
    </Button>
  ))
