import React, { useState, useRef, useEffect, useReducer } from "react";
import { Sizeme, Button } from '../../components'
import { MdSettings, MdClose, MdKeyboardBackspace } from "react-icons/md";
import produce from 'immer'

import Panel from "./Panel";
import * as S from "./styles";
import { useMouse, useGetCenter } from "../../useHooks";
import { drawLines, drawBackground } from "./draw";

const defaultState = {
  lines: [
    {
      color: "white",
      points: [],
      divisions: 50,
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
      draftState.push({
        ...draftState[draftState.length - 1],
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

    case "LINE_RESTORE":
      return payload;
      
    case "LINE_CLEAR":
      return defaultState.lines;
      
    default:
      return defaultState.lines;
  }
}


const Art = ({ width, height }) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus } = useMouse(canvas);
  const { center } = useGetCenter(canvas);
  const [ lines, setLines ] = useReducer(linesReducer, defaultState.lines);
  const [ storyline, setStoryline ] = useState([]);
  const [ isModalOpen, setToggleModal ] = useState(null);
  const [ backgroundColor, setBackGroundColor ] = useState("black");

  function goBack(storyline) {
    const lastStory = storyline[storyline.length -2]
    setLines({ type: "LINE_RESTORE", payload: lastStory.lines})    
    setLines({ type: "LINE_ADD" });
    setStoryline(storyline.slice(0, storyline.length -1))
  }

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
            // timestamp: new Date().getTime(),
          },
        });
      }
    },
    [mousePosition, mouseStatus === 'mouseup']
  );


  useEffect(
    () => {
      drawBackground({ 
        ctx: canvas.current.getContext("2d"), 
        backgroundColor,
        width,
        height
      })
      drawLines({
        ctx: canvas.current.getContext("2d"),
        lines,
        center,
      });
      return () => {
        canvas.current.getContext("2d").clearRect(0, 0, width, height)
      }
    },
    [lines, backgroundColor]
  );

  useEffect(
    () => {
      canvas.current.style.width = `${window.innerWidth}px`;
      canvas.current.style.height = `${window.innerHeight}px`;
      const ratio = window.devicePixelRatio;
      canvas.current.width = width * ratio;
      canvas.current.height = height * ratio;
      canvas.current.getContext("2d").scale(ratio, ratio);
      drawBackground({ 
        ctx: canvas.current.getContext("2d"), 
        backgroundColor,
        width,
        height
      })
    },
    [canvas.current, width, height]
  );

  return (
    <>
      <canvas id="canvas" width={width} height={height} ref={canvas} />
      <S.Controllers>
        <Button
          onClick={() => {
            setStoryline([]);
            setLines({ type: "LINE_CLEAR" });
            drawBackground({ 
              ctx: canvas.current.getContext("2d"), 
              backgroundColor,
              width,
              height
            })
          }}
        >
          <MdClose />
        </Button>
        <Button
          onClick={() => storyline && storyline.length > 1 && goBack(storyline)}
        >
          <MdKeyboardBackspace />
        </Button>
        <Button onClick={() => setToggleModal(true)}>
          <MdSettings />
        </Button>
      </S.Controllers>
      {isModalOpen && (
        <Panel
          setToggleModal={setToggleModal}
          handleLineUpdate={(payload) => setLines({ type: "LINE_UPDATE", payload})}
          setBackGroundColor={setBackGroundColor}
          color={lines[lines.length -1].color}
          divisions={lines[lines.length -1].divisions}
          thickness={lines[lines.length -1].thickness}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );
};



export default () => <Sizeme>
  {({ size }) => 
    <Art {...size} />  
  } 
</Sizeme>