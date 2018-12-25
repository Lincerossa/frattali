import React from "react";
import { ColorPicker } from "../../components";
import * as S from "./styles";
import { MdClose } from "react-icons/md";
import { Sizeme } from '../../headless'

export default ({ frattali, color, effect, setToggleModal, handleLineUpdate, thickness }) => (
  <S.Panel>
    <S.PanelClose onClick={() => setToggleModal(null)}>
      <MdClose />
    </S.PanelClose>
    <S.PanelBlock>
      <S.PanelBlockTitle>divisions</S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <Sizeme>
          {({size}) => (
            <S.InputRange 
              type="range" 
              min="1" max="200" 
              value={frattali} 
              onChange={e => handleLineUpdate({frattali: e.target.value})}
              step="1"
              width={size.width}
              height={size.height}
            />
          )}
        </Sizeme>

      </S.ButtonsWrapper>
    </S.PanelBlock>
    <S.PanelBlock>
      <S.PanelBlockTitle>
        Dimension
      </S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <Sizeme>
          {({size}) => (
            <S.InputRange 
              type="range" 
              min="1" max="10" 
              value={thickness} 
              onChange={e => handleLineUpdate({thickness: e.target.value})}
              step="1"
              width={size.width}
              height={size.height}
            />
          )}
        </Sizeme>

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
