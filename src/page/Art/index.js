import React, { useState, useRef, useEffect, useReducer } from "react";

import { MdSettings, MdClose, MdKeyboardBackspace } from "react-icons/md";
import produce from 'immer'

import Panel from "./Panel";
import * as S from "./styles";
import { useMouse, useGetCenter } from "../../useHooks";
import draw from "./draw";

const defaultState = {
  lines: [
    {
      color: "white",
      points: [],
      frattali: 50,
      effect: null,
      thickness: 1,
    },
  ],
};

function linesReducer(state, { type, payload }) {
  switch (type) {

    case "LINE_POINT_ADD":
    return produce(state, draftState => {
      draftState[draftState.length - 1].points.push(payload)
    })

    case "LINE_ADD":
    return produce(state, draftState => {
      const { color, frattali, effect, thickness} = draftState[draftState.length - 1]
      draftState.push({
        color,
        frattali,
        effect,
        thickness,
        points: [],
      })
    })

    case "LINE_UPDATE":
      return produce(state, draftState => {
        draftState[draftState.length - 1] = {
          ...draftState[draftState.length - 1],
          ...payload,
        }
      })

    case "LINE_NEW":
      return payload;
      
    case "LINE_CLEAR":
      return defaultState.lines;
      
    default:
      return defaultState.lines;
  }
}


export default ({ width, height }) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus } = useMouse(canvas);
  const { center } = useGetCenter(canvas);
  const [lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [storyline, setStoryline] = useState([]);
  const [isModalOpen, setToggleModal] = useState(null);

  function goBack(storyline) {
    canvas.current.getContext("2d").clearRect(0, 0, width, height);
    const lastStory = storyline[storyline.length -2]
    setLines({ type: "LINE_NEW", payload: lastStory.lines})    
    setLines({ type: "LINE_ADD" });
    setStoryline(storyline.slice(0, storyline.length -1))
  }

  useEffect(
    () => {
      draw({
        ctx: canvas.current.getContext("2d"),
        lines,
        center,
      });
    },
    [lines]
  );

  useEffect(
    () => {
      if (
        mouseStatus === "mouseup" &&
        lines &&
        lines[lines.length - 1].points.length
      ) {
        setStoryline(produce(storyline, draftState => {
          draftState.push({
            lines
          })
        }));
        setLines({ type: "LINE_ADD" });
      }
      if (mouseStatus === "mousedown") {
        setLines({
          type: "LINE_POINT_ADD",
          payload: {
            // pt già sul piano cartesiano con coordinate del centro, quelle di center
            x: mousePosition.x - center.x,
            y: center.y - mousePosition.y,
            timestamp: new Date().getTime(),
          },
        });
      }
    },
    [mousePosition, mouseStatus === 'mouseup']
  );

  useEffect(
    () => {
      canvas.current.style.width = `${window.innerWidth}px`;
      canvas.current.style.height = `${window.innerHeight}px`;
      const ratio = window.devicePixelRatio;
      canvas.current.width = window.innerWidth * ratio;
      canvas.current.height = window.innerHeight * ratio;
      canvas.current.getContext("2d").scale(ratio, ratio);
    },
    [canvas.current, width, height]
  );

  return (
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height} ref={canvas} />
      </S.CanvasInner>
      
      <S.Controllers>
        <S.Controller
          onClick={() => {
            setStoryline([]);
            setLines({ type: "LINE_CLEAR" });
            canvas.current.getContext("2d").clearRect(0, 0, width, height);
          }}
        >
          <MdClose />
        </S.Controller>
        <S.Controller
          onClick={() => storyline && storyline.length > 1 && goBack(storyline)}
        >
          <MdKeyboardBackspace />
        </S.Controller>
        <S.Controller onClick={() => setToggleModal(true)}>
          <MdSettings />
        </S.Controller>
      </S.Controllers>
      {isModalOpen && (
        <Panel
          setToggleModal={setToggleModal}
          handleLineUpdate={(payload) => setLines({ type: "LINE_UPDATE", payload})}
          color={lines[lines.length -1].color}
          frattali={lines[lines.length -1].frattali}
          effect={lines[lines.length -1].effect}
          thickness={lines[lines.length -1].thickness}
        />
      )}
    </S.CanvasWrapper>
  );
};
