import React from 'react'

import * as S from './styles'

export default ({ children, onClick, backgroundImage }) => (
  <S.Button onClick={onClick} backgroundImage={backgroundImage}>
    {children}
  </S.Button>
)
