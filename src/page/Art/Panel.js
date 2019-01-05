import React from "react";
import { ColorPicker } from "../../components";
import * as S from "./styles";
import { MdClose } from "react-icons/md";

import { Sizeme, Canvas } from '../../components'


export default ({ divisions, color, handleClosePanel, handleLineUpdate, thickness, setBackGroundColor, backgroundColor }) => (
  <S.Panel>
    <S.PanelClose onClick={handleClosePanel}>
      <MdClose />
    </S.PanelClose>
    <S.PanelBlock>
      <S.PanelBlockTitle>example</S.PanelBlockTitle>
        <Sizeme>
          {({size}) => (
            <S.CanvasWrapper>
              <Canvas 
                {...size}
                backgroundColor={backgroundColor}
                lines={[
                  {
                    divisions,
                    color,
                    thickness,
                    points: Array.from({length: 20}, (index, e) => ({
                      x: 0,
                      y: e*4 + 30
                    }))
                  }
                ]}
              />
            </S.CanvasWrapper>
          )}
        </Sizeme>
    </S.PanelBlock>
    <S.PanelBlock>
      <S.PanelBlockTitle>divisions</S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <Sizeme>
          {({size}) => (
            <S.InputRange 
              type="range" 
              min="1" max="200" 
              color={color}
              value={divisions} 
              onChange={e => handleLineUpdate({divisions: e.target.value})}
              step="1"
              {...size}
            />
          )}
        </Sizeme>

      </S.ButtonsWrapper>
    </S.PanelBlock>
    <S.PanelBlock>
      <S.PanelBlockTitle>
        Line width
      </S.PanelBlockTitle>
      <S.ButtonsWrapper>
        <Sizeme>
          {({size}) => (
            <S.InputRange 
              type="range" 
              min="1" max="10" 
              value={thickness} 
              color={color}
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
      <S.PanelBlockTitle>
        line color <S.ColorBlock color={color} />{" "}
      </S.PanelBlockTitle>
      <ColorPicker
        color={color}
        setColor={color => handleLineUpdate({ color })}
      />
    </S.PanelBlock>

    <S.PanelBlock>
      <S.PanelBlockTitle>
        background color <S.ColorBlock color={backgroundColor} />{" "}
      </S.PanelBlockTitle>
      <ColorPicker
        color={backgroundColor}
        setColor={color => setBackGroundColor(color)}
      />
    </S.PanelBlock>
  </S.Panel>
)
