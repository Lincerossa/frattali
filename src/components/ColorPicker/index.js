import React, { useState} from 'react';
import { SketchPicker } from 'react-color';


export default ({color, updateColor}) => {
  

  function handleChangeComplete(color){
    updateColor(color.hex)
  }
  
  return(
    <SketchPicker
      color={color}
      onChangeComplete={ handleChangeComplete }
    />
  )
}


