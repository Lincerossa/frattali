import React from 'react'
import { storiesOf } from '@storybook/react'
import Fullscreen from './index'

storiesOf('Fullscreen', module)
  .add('default', () => <Fullscreen />)
  .add('with background black', () => <Fullscreen backgroundColor="black" />)
