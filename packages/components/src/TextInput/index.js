import React, { useState, useEffect } from 'react'
import * as S from './styles'
import Label from '../Label'

export default ({ value, onChange, label }) => {
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    if (innerValue === value) return
    onChange(innerValue)
  }, [innerValue])

  return (
    <>
      {label && <Label>{label}</Label>}
      <S.TextInput
        type="text"
        value={innerValue}
        onChange={e => setInnerValue(e.target.value)}
      />
    </>
  )
}
