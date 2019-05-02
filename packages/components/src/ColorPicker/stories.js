import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ColorPicker from './index'

storiesOf('Color Picker', module)
  .add('default', () => <ColorPicker />)
  .add('with selected color', () => <ColorPicker color="violet" />)
  .add('with selected color and function to change color', () => (
    <ColorPicker color="violet" setColor={action('colore selezionato')} />
  ))
