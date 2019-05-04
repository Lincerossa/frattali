import React, { useEffect, useState } from 'react'
import * as S from './styles'

import Label from '../Label'
export default ({ value, step = 1, min, max, onChange, label }) => {
  const [innerValue, setInnerValue] = useState(value)

  function handleInnerChange(e) {
    setInnerValue(e.target.value)
  }

  useEffect(() => {
    if (innerValue !== value) {
      onChange(innerValue)
    }
  }, [innerValue])

  return (
    <>
      {label && <Label>{label}</Label>}
      <S.InputRange
        type="range"
        min={min}
        max={max}
        value={innerValue}
        onChange={handleInnerChange}
        step={step}
      />
    </>
  )
}
