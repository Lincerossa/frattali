import React, { useRef, useEffect } from "react";
import { ColorPicker } from "../../components";
import * as S from "./styles";
import { MdClose } from "react-icons/md";
import { Sizeme } from '../../headless'
import { drawLines, drawBackground } from './draw'
import { useGetCenter } from '../../useHooks'

function CanvasExample({width, height, backgroundColor, ...linesProps}){
  const canvas = useRef(null);
  const { center } = useGetCenter(canvas);

  useEffect(
    () => {
      if(center) {
        drawBackground({ 
          ctx: canvas.current.getContext("2d"), 
          backgroundColor,
          width,
          height
        })
        drawLines({
          ctx: canvas.current.getContext("2d"),
          lines: [
            {
              ...linesProps,
              points: Array.from({length: 20}, (index, e) => ({
                x: 0,
                y: e*4 + 30
              }))
            }
          ],
          center,
        })
      }

      return () => {
        canvas.current.getContext("2d").clearRect(0, 0, width, 200);
      }
    }
    ,
    [center, linesProps, backgroundColor]
  );

  return (
   <S.CanvasInner>
      <canvas id="canvas" width={width} height={200} ref={canvas} />
    </S.CanvasInner>
  )
}

export default ({ frattali, color, effect, setToggleModal, handleLineUpdate, thickness, setBackGroundColor, backgroundColor }) => (
  <S.Panel>
    <S.PanelClose onClick={() => setToggleModal(null)}>
      <MdClose />
    </S.PanelClose>
    <S.PanelBlock>
      <S.PanelBlockTitle>example</S.PanelBlockTitle>
      <Sizeme>
        {({size}) => (
          <CanvasExample 
            frattali={frattali}
            color={color}
            effect={effect}
            thickness={thickness}
            backgroundColor={backgroundColor}
            {...size} 
          />
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
              value={frattali} 
              onChange={e => handleLineUpdate({frattali: e.target.value})}
              step="1"
              {...size}
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
    {/* <S.PanelBlock>
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
    </S.PanelBlock>*/}
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
