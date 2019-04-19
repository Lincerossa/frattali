import React from 'react'
import * as S from './styles'

export default ({ text }) => (
  <S.Loading>
    <S.LoadingText>{text}</S.LoadingText>
  </S.Loading>
)
