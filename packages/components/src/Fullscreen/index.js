import React from 'react'
import * as S from './styles'

export default ({ children, backgroundColor, opacity }) => (
  <S.Fullscreen opacity={opacity} backgroundColor={backgroundColor}>
    {children}
  </S.Fullscreen>
)
