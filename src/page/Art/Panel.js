import React from "react";
import { ColorPicker } from "../../components";
import * as S from "./styles";
import { MdClose } from "react-icons/md";

export default ({ frattali, color, effect, setAll, handleLineUpdate }) => (
  <S.Panel>
    <S.PanelClose onClick={() => setAll({ modal: null })}>
      <MdClose />
    </S.PanelClose>
    <S.PanelBlock>
      <S.PanelBlockTitle>divisions: {frattali}</S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <S.Button
          onClick={() => handleLineUpdate({ frattali: frattali - 1 })}
        >
          {" "}
          -1
        </S.Button>
        <S.Button
          onClick={() => handleLineUpdate({ frattali: frattali + 1 })}
        >
          {" "}
          +1
        </S.Button>
      </S.ButtonsWrapper>
    </S.PanelBlock>
    <S.PanelBlock>
      <S.PanelBlockTitle>style</S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <S.Button
          onClick={() => handleLineUpdate({ effect: "noise" })}
          isActive={effect === "noise"}
        >
          Noise
        </S.Button>
        <S.Button
          onClick={() => handleLineUpdate({ effect: "tree" })}
          isActive={effect === "tree"}
        >
          Tree
        </S.Button>
        <S.Button
          onClick={() => handleLineUpdate({ effect: "japanese" })}
          isActive={effect === "japanese"}
        >
          Japanese
        </S.Button>
        <S.Button
          onClick={() => handleLineUpdate({ effect: null })}
          isActive={effect === null}
        >
          Line
        </S.Button>
      </S.ButtonsWrapper>
    </S.PanelBlock>
    <S.PanelBlock>
      <S.PanelBlockTitle>
        color <S.ColorBlock color={color} />{" "}
      </S.PanelBlockTitle>
      <ColorPicker
        color={color}
        setColor={color => handleLineUpdate({ color })}
      />
    </S.PanelBlock>
  </S.Panel>
)
