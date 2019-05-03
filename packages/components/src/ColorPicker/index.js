import React from 'react'
import { HuePicker } from 'react-color'
import Label from '../Label'

export default ({ color, setColor, label }) => (
  <>
    {label && <Label>{label}</Label>}
    <HuePicker color={color} onChangeComplete={color => setColor(color.hex)} />
  </>
)
