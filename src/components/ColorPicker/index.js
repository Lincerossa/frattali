import React from 'react';
import { SketchPicker } from 'react-color';


export default ({color, setColor}) => <SketchPicker
  color={color}
  onChangeComplete={color =>  setColor(color.hex) }
/>