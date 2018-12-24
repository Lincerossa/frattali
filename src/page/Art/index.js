import React, { useState, useRef, useEffect, useReducer } from "react";

import { MdSettings, MdClose, MdKeyboardBackspace } from "react-icons/md";
import produce from 'immer'

import Panel from "./Panel";
import * as S from "./styles";
import { useMouse, useCanvasCenter } from "../../useHooks";
import { drawFrattali } from "./draw";

const defaultState = {
  lines: [
    {
      color: "white",
      points: [],
      frattali: 50,
      effect: null,
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
      const { color, frattali, effect } = draftState[draftState.length - 1]
      draftState.push({
        color,
        frattali,
        effect,
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

    case "LINES_NEW": {
      return payload;
    }

    case "LINE_CLEAR":
      return defaultState.lines;
      
    default:
      return defaultState.lines;
  }
}

function getPreviousState(storyline) {

  return produce(storyline, draftState => {

    const currentStoryIndex = draftState.findIndex(({ isCurrent }) => isCurrent);

    if (draftState[currentStoryIndex - 1]) {
      const { lines, frattali, color, effect } = draftState[currentStoryIndex - 1];
  
      return {
        lines: { type: "LINES_NEW", payload: lines },
        frattali,
        color,
        effect,
        storyline: [
          ...draftState.slice(0, currentStoryIndex - 1),
          {
            ...draftState[currentStoryIndex - 1],
            isCurrent: true,
          },
        ],
      };
    }
    return null;


  })


}

export default ({ width, height }) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus } = useMouse(canvas);
  const { canvasCenter } = useCanvasCenter(canvas);
  const [lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [frattali, setFrattali] = useState(50);
  const [effect, setEffect] = useState(null);
  const [color, setColor] = useState("white");
  const [storyline, setStoryline] = useState([]);
  const [isModalOpen, openModal] = useState(null);

  function setAll({ lines, frattali, color, effect, storyline, modal }) {
    lines && setLines(lines);
    frattali && setFrattali(frattali);
    color && setColor(color);
    effect !== undefined && setEffect(effect);
    modal !== undefined && openModal(modal);
    storyline && setStoryline(storyline);
  }

  function goBack(storyline) {
    canvas.current.getContext("2d").clearRect(0, 0, width, height);
    const previousState = getPreviousState(storyline)
    setAll(previousState);
    setLines({ type: "LINE_ADD" });
  }

  function handleLineUpdate(payload) {
    setAll({ 
      lines: { type: "LINE_UPDATE", payload},
      ...payload 
    });
  }

  useEffect(
    () => {
      drawFrattali({
        ctx: canvas.current.getContext("2d"),
        lines,
        canvasCenter,
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
        const updatedStoryline = produce(storyline, draftState => {
          const lastStory = draftState[draftState.length - 1]
          if(lastStory) lastStory.isCurrent = false
          draftState.push({
            lines,
            frattali,
            color,
            effect,
            isCurrent: true})
          })
        setStoryline(updatedStoryline);
        setLines({ type: "LINE_ADD" });
      }
      if (mouseStatus === "mousedown") {
        setLines({
          type: "LINE_POINT_ADD",
          payload: {
            ...mousePosition,
            timestamp: new Date().getTime(),
          },
        });
      }
    },
    [mousePosition, mouseStatus]
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
        <S.Controller onClick={() => openModal(true)}>
          <MdSettings />
        </S.Controller>
      </S.Controllers>
      {isModalOpen && (
        <Panel
          setAll={setAll}
          handleLineUpdate={handleLineUpdate}
          color={color}
          frattali={frattali}
          effect={effect}
        />
      )}
    </S.CanvasWrapper>
  );
};
