import React, { useEffect, useState } from 'react'
import * as S from './styles'

export default ({ value, min, max, onChange }) => {
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
    <S.InputRange
      type="range"
      min={min}
      max={max}
      value={innerValue}
      onChange={handleInnerChange}
      step="1"
    />
  )
}
