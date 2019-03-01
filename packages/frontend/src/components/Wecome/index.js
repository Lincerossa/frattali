import React from "react";
import * as S from "./styles";

export default ({ nickname, picture, timer }) => (
  <S.Welcome timer={timer}>
    <S.Picture backgroundImage={picture}>
      <S.Nickname>{nickname}</S.Nickname>
    </S.Picture>
  </S.Welcome>
);
