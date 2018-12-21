import React, { useState, useRef, useEffect, useReducer } from 'react'

import { MdSettings } from 'react-icons/md';

import { Panel, ModalOverlay, ColorPicker } from '../../components'

import * as S from './styles'
import { useMouse, useCanvasCenter } from '../../useHooks'
import { drawFrattali } from './draw'

const defaultState = {
  lines:[{
    color: 'white',
    points: [],
    frattali: 3,
    effect: null
  }],
  isModalOpen: null,
  color: 'white',
  effect: null,
  frattali: 3,
}


function linesReducer(state, {type, payload}) {
    
  let newLines = [...state]
  const lastLine = newLines[newLines.length -1 ]

  switch (type) {
    case "LINE_POINT_ADD":
      return [
        ...newLines.slice(0, newLines.length -1), 
        {
          ...lastLine, 
          points: [...lastLine.points, payload]
        }
      ]
    case "LINE_ADD":
      return [...newLines, {
        color: lastLine.color,
        frattali: lastLine.frattali,
        points: []
      }]

    case "LINE_UPDATE":
      return [
        ...newLines.slice(0, newLines.length -1), 
        {
          ...lastLine, 
          ...payload
        }
      ]

    case "CLEAR":
      return defaultState.lines
    default:
      return defaultState.lines
  }
}


export default ({width, height}) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus }  = useMouse() 
  const { canvasCenter } =  useCanvasCenter(canvas)
  const [ lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [ frattali, setFrattali ] =  useState(defaultState.frattali)
  const [ effect, setEffect ] =  useState(defaultState.effect)
  const [ color, setColor ] = useState(defaultState.color)
  const [ isModalOpen, setModal ] = useState(defaultState.isModalOpen)

  useEffect(() => {
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l]
      if(!line || !line.points.length) return
      drawFrattali({ctx: canvas.current.getContext("2d"), line, canvasCenter})
    }  
  }, [lines]);

  useEffect(() => {
    if(mouseStatus === "mousedown"){
      setLines({type:'LINE_POINT_ADD', payload: {...mousePosition, timestamp: new Date().getTime()}})
    }
    if(mouseStatus === "mouseup" && lines[lines.length -1].points.length){
      setLines({type:'LINE_ADD'})
    }
  }, [mousePosition]);

  return(
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
      </S.CanvasInner>
      <S.PanelOpen onClick={() => setModal(true)}><MdSettings /></S.PanelOpen>
      {
        isModalOpen && (
          <ModalOverlay handleClose={setModal}>
            <Panel
              items={[
                [
                  {
                    onClick: () => {
                      setLines({type:'CLEAR'})
                      canvas.current.getContext("2d").clearRect(0, 0, width, height);
                    },
                    text: "Repaint"
                  }
                ],
                [
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        frattali: frattali -1
                      }})
                      setFrattali(frattali-1)
                    },
                    text: "-"
                  },

                  {
                    text: `${frattali} aree`,
                    isActive: true,
                  },
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        frattali: frattali + 1
                      }})
                      setFrattali(frattali+1)
                    },
                    text: "+"
                  },
                ],

                [
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        effect: "noise"
                      }})
                      setEffect("noise")
                      setModal(false)
                    },
                    text: "Noise",
                    isActive: effect === "noise"
                  },
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        effect: "tree"
                      }})
                      setEffect("tree")
                      setModal(false)
                    },
                    text: "Tree",
                    isActive: effect === "tree"
                  },
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        effect: "japanese"
                      }})
                      setEffect("japanese")
                      setModal(false)
                    },
                    text: "Japanese",
                    isActive: effect === "japanese"
                  },
                  {
                    onClick: () => {
                      setLines({type:'LINE_UPDATE', payload: {
                        effect: null
                      }})
                      setEffect(null)
                      setModal(false)
                    },
                    text: "Natural",
                    isActive: effect === null
                  }
                ],
                [
                  {
                    Component: () => (
                      <ColorPicker color={color} setColor={color => {
                        setLines({type:'LINE_UPDATE', payload: {
                          color
                        }})
                        setColor(color)
                      }} />)
                  }
                ]
              ]}
            />
          </ModalOverlay>)
      }
      
    </S.CanvasWrapper> 
  )

}