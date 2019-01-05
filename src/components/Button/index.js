import React from "react";

import * as S from './styles'

export default ({children, onClick}) => <S.Button onClick={onClick}>{children}</S.Button>