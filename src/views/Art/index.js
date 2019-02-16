import React, { useState, useRef, useEffect, useReducer } from "react";
import { Sizeme, Button, Canvas } from "../../components";
import { MdSettings, MdClose, MdKeyboardBackspace } from "react-icons/md";
import produce from "immer";
import { connect } from "react-redux";
import { getUserName } from "../../Redux/auth/reducer";
import Panel from "./Panel";
import * as S from "./styles";
import { useMouse, useGetCenter } from "../../useHooks";

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
        draftState[draftState.length - 1].points.push(payload);
      });

    case "LINE_ADD":
      return produce(state, draftState => {
        draftState.push({
          ...draftState[draftState.length - 1],
          points: [],
        });
      });

    case "LINE_UPDATE":
      return produce(state, draftState => {
        draftState[draftState.length - 1] = {
          ...draftState[draftState.length - 1],
          ...payload,
        };
      });

    case "LINE_RESTORE":
      return payload;

    case "LINE_CLEAR":
      return defaultState.lines;

    default:
      return defaultState.lines;
  }
}

const Art = ({ width, height, userName }) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus } = useMouse(canvas);
  const { center } = useGetCenter(canvas);
  const [lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [storyOfLines, setStoryOfLines] = useState([]);
  const [hd, setHd] = useState(null);
  const [isPanelOpen, openPanel] = useState(null);
  const [backgroundColor, setBackGroundColor] = useState("black");

  function goBack(storyOfLines) {
    const lastStory = storyOfLines[storyOfLines.length - 2];
    setLines({ type: "LINE_RESTORE", payload: lastStory.lines });
    setLines({ type: "LINE_ADD" });
    setStoryOfLines(storyOfLines.slice(0, storyOfLines.length - 1));
  }

  useEffect(() => {
    if (
      mouseStatus === "mouseup" &&
      lines &&
      lines[lines.length - 1].points.length
    ) {
      setStoryOfLines(
        produce(storyOfLines, draftState => {
          draftState.push({
            lines,
          });
        })
      );
      setLines({ type: "LINE_ADD" });
    }
    if (mouseStatus === "mousedown") {
      setLines({
        type: "LINE_POINT_ADD",
        payload: {
          // pt già sul piano cartesiano con coordinate del centro, quelle di center
          x: mousePosition.x - center.x,
          y: center.y - mousePosition.y,
        },
      });
    }
  }, [mousePosition, mouseStatus === "mouseup"]);

  return (
    <>
      <Sizeme>
        {({ size }) => (
          <S.CanvasWrapper ref={canvas} fullheight>
            <Canvas
              width={width}
              height={height}
              hd={hd}
              lines={lines}
              backgroundColor={backgroundColor}
              {...size}
            />
          </S.CanvasWrapper>
        )}
      </Sizeme>
      <S.Controllers>
        <Button
          onClick={() => {
            setStoryOfLines([]);
            setLines({ type: "LINE_CLEAR" });
          }}
        >
          <MdClose />
        </Button>
        <Button
          onClick={() =>
            storyOfLines && storyOfLines.length > 1 && goBack(storyOfLines)
          }
        >
          <MdKeyboardBackspace />
        </Button>
        <Button onClick={() => openPanel(true)}>
          <MdSettings />
        </Button>
      </S.Controllers>
      <S.UserName>
        <S.UserNameWelcome>hello</S.UserNameWelcome>
        {userName}
      </S.UserName>
      {isPanelOpen && (
        <Panel
          handleClosePanel={() => openPanel(false)}
          handleLineUpdate={payload =>
            setLines({ type: "LINE_UPDATE", payload })
          }
          setBackGroundColor={setBackGroundColor}
          setHd={setHd}
          hd={hd}
          color={lines[lines.length - 1].color}
          divisions={lines[lines.length - 1].divisions}
          thickness={lines[lines.length - 1].thickness}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  userName: getUserName(state),
});
export default connect(mapStateToProps)(Art);
