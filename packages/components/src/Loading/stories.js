import React from 'react'
import { storiesOf } from '@storybook/react'
import Loading from './index'
import Fullscreen from '../Fullscreen'

storiesOf('Loading', module).add('default', () => (
  <Fullscreen backgroundColor="red">
    <Loading />
  </Fullscreen>
))
