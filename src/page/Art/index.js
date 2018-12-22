import React, { useState, useRef, useEffect, useReducer } from "react";

import { MdSettings, MdClose, MdKeyboardBackspace } from "react-icons/md";

import Panel from "./Panel";
import * as S from "./styles";
import { useMouse, useCanvasCenter } from "../../useHooks";
import { drawFrattali } from "./draw";

const defaultState = {
  lines: [
    {
      color: "white",
      points: [],
      frattali: 30,
      effect: null,
    },
  ],
};

function linesReducer(state, { type, payload }) {
  let newLines = [...state];
  const lastLine = newLines[newLines.length - 1];

  switch (type) {
    case "LINE_POINT_ADD":
      return [
        ...newLines.slice(0, newLines.length - 1),
        {
          ...lastLine,
          points: [...lastLine.points, payload],
        },
      ];
    case "LINE_ADD":
      return [
        ...newLines,
        {
          color: lastLine.color,
          frattali: lastLine.frattali,
          effect: lastLine.effect,
          points: [],
        },
      ];

    case "LINE_UPDATE":
      return [
        ...newLines.slice(0, newLines.length - 1),
        {
          ...lastLine,
          ...payload,
        },
      ];
    case "LINES_NEW": {
      return payload;
    }
    case "LINE_CLEAR":
      return defaultState.lines;
    default:
      return defaultState.lines;
  }
}

function getUpdatedStoryline(storyline, state) {
  const lastStory = storyline[storyline.length - 1];
  if (lastStory) {
    return [
      ...(storyline.slice(0, storyline.length - 1) || []),
      {
        ...lastStory,
        isCurrent: false,
      },
      {
        ...state,
        isCurrent: true,
      },
    ];
  }
  return [
    {
      ...state,
      isCurrent: true,
    },
  ];
}

function getPreviousState(storyline) {
  if (!storyline || !storyline.length) return;
  const currentStoryIndex = storyline.findIndex(({ isCurrent }) => isCurrent);

  if (storyline[currentStoryIndex - 1]) {
    const { lines, frattali, color, effect } = storyline[currentStoryIndex - 1];

    return {
      lines: { type: "LINES_NEW", payload: lines },
      frattali,
      color,
      effect,
      storyline: [
        ...storyline.slice(0, currentStoryIndex - 1),
        {
          ...storyline[currentStoryIndex - 1],
          isCurrent: true,
        },
      ],
    };
  }
  return null;
}

export default ({ width, height }) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus } = useMouse(canvas);
  const { canvasCenter } = useCanvasCenter(canvas);
  const [lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [frattali, setFrattali] = useState(30);
  const [effect, setEffect] = useState(null);
  const [color, setColor] = useState("white");
  const [storyline, setStory] = useState([]);
  const [isModalOpen, openModal] = useState(null);

  useEffect(
    () => {
      if (!lines) return;
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        if (!line || !line.points.length) return;
        drawFrattali({
          ctx: canvas.current.getContext("2d"),
          line,
          canvasCenter,
        });
      }
    },
    [lines]
  );

  function goBack(storyline) {
    const previousState = getPreviousState(storyline);
    if (previousState) {
      const { frattali, lines, color, effect, storyline } = previousState;
      setColor(color);
      setFrattali(frattali);
      setEffect(effect);
      setStory(storyline);
      canvas.current.getContext("2d").clearRect(0, 0, width, height);
      setLines(lines);
      setLines({ type: "LINE_ADD" });
    }
  }

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

  useEffect(
    () => {
      if (
        mouseStatus === "mouseup" &&
        lines &&
        lines[lines.length - 1].points.length
      ) {
        setLines({ type: "LINE_ADD" });
        const updatedStoryline = getUpdatedStoryline(storyline, {
          lines,
          frattali,
          color,
          effect,
        });
        setStory(updatedStoryline);
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

  return (
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height} ref={canvas} />
      </S.CanvasInner>
      <S.Controllers>
        <S.Controller
          onClick={() => {
            setLines({ type: "LINE_CLEAR" });
            setStory([]);
            canvas.current.getContext("2d").clearRect(0, 0, width, height);
          }}
        >
          <MdClose />
        </S.Controller>
        <S.Controller onClick={() => goBack(storyline)}>
          <MdKeyboardBackspace />
        </S.Controller>
        <S.Controller onClick={() => openModal(true)}>
          <MdSettings />
        </S.Controller>
      </S.Controllers>
      {isModalOpen && (
        <Panel
          setLines={setLines}
          setEffect={setEffect}
          setColor={setColor}
          setFrattali={setFrattali}
          color={color}
          frattali={frattali}
          openModal={openModal}
          effect={effect}
        />
      )}
    </S.CanvasWrapper>
  );
};
