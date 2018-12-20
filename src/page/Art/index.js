import React, { useState, useRef, useEffect, useReducer } from 'react'

import { MdSettings, dExposurePlus1 ,MdExposureNeg1 } from 'react-icons/md';

import { Panel, ModalOverlay, ColorPicker } from '../../components'

import * as S from './styles'
import { useMouse, useCanvasCenter } from '../../useHooks'
import { drawFrattali } from './draw'


export default ({width, height}) => {
  const canvas = useRef(null);
  
  const { mousePosition, mouseStatus }  = useMouse() 
  const { canvasCenter } =  useCanvasCenter(canvas)
  const [ points, setPoints ] =  useState([])
  const [ lines, setLines] = useReducer(linesReducer, [[]]);
  const [ frattali, setFrattali ] =  useState(2)
  const [ effect, setEffect ] =  useState(null)
  const [ color, setColor ] = useState("white")
  const [ isModalOpen, setModal ] = useState(0)

  function linesReducer(state = [[]], {type, payload}) {
    let newLines = [...state]
    const lastLine = newLines[newLines.length -1 ]
    switch (type) {
      case "POINT_ADD":
        return [...newLines.slice(0, newLines.length -1), [...lastLine, payload]]
      case "LINE_ADD":
        return [...newLines, []]
      case "CLEAR":
        return [[]]
      default:
        return state
    }
  }

  useEffect(() => {
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l]
      if(!line.length  || !line[0]) return
      drawFrattali({ctx: canvas.current.getContext("2d"), line, frattali, canvasCenter, effect, color})
    }  
  }, [points]);

  useEffect(() => {
    if(mouseStatus === "mousedown"){
      setPoints([...points, mousePosition].filter(e => e))
      setLines({type:'POINT_ADD', payload: mousePosition})
    }
    if(mouseStatus === "mouseup" && lines[lines.length -1].length){
      setLines({type:'LINE_ADD'})
    }
  }, [mousePosition]);

  function clearCanvas(){
    setPoints([])
    setLines({type:'CLEAR'})
  }

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
                      clearCanvas()
                      canvas.current.getContext("2d").clearRect(0, 0, width, height);
                    },
                    text: "Repaint"
                  }
                ],
                [
                  {
                    onClick: () => {
                      clearCanvas()
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
                      clearCanvas()
                      setFrattali(frattali+1)
                    },
                    text: "+"
                  },
                ],

                [
                  {
                    onClick: () => {
                      clearCanvas()
                      setEffect("noise")
                    },
                    text: "Noise",
                    isActive: effect === "noise"
                  },
                  {
                    onClick: () => {
                      clearCanvas()
                      setEffect("tree")
                    },
                    text: "Tree",
                    isActive: effect === "tree"
                  },
                  {
                    onClick: () => {
                      clearCanvas()
                      setEffect("japanese")
                    },
                    text: "Japanese",
                    isActive: effect === "japanese"
                  },
                  {
                    onClick: () => {
                      clearCanvas()
                      setEffect(null)
                    },
                    text: "Natural",
                    isActive: effect === null
                  }
                ],
                [
                  {
                    Component: () => (
                      <ColorPicker color={color} setColor={color => {
                        clearCanvas()
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