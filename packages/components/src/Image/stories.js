import React from 'react'
import { storiesOf } from '@storybook/react'
import Image from './index'

storiesOf('Image', module).add('default', () => (
  <Image picture="https://www.unsplash.it/400/700" />
))
