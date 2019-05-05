import React from 'react'
import * as S from './styles'

export default ({ picture, round }) => (
  <S.ImageWrapper round={round}>
    <S.Image picture={picture} />
  </S.ImageWrapper>
)
