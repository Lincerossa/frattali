import React from "react";
import * as S from "./styles";

export default ({ nickname, picture }) => (
  <S.Welcome>
    <S.Picture backgroundImage={picture}>
      <S.Nickname>{nickname}</S.Nickname>
    </S.Picture>
  </S.Welcome>
);
