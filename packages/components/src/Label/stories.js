import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Label from './index'

storiesOf('Label', module).add('default', () => <Label>default label</Label>)
