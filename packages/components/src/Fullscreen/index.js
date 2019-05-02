import React from 'react'
import * as S from './styles'

export default ({ children, backgroundColor }) => (
  <S.Fullscreen backgroundColor={backgroundColor}>{children}</S.Fullscreen>
)
