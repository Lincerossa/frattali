import React from "react";

import * as S from "./styles";

export default ({ children, onClick, backgroundImage }) =>
  console.log("ok") || (
    <S.Button onClick={onClick} backgroundImage={backgroundImage}>
      {children}
    </S.Button>
  );
