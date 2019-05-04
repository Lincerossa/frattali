import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Sidebar from './index'

storiesOf('Sidebar', module).add('default', () => (
  <Sidebar onClose={action('chiuso')} />
))
