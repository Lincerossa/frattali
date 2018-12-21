import React, { useState, useRef, useEffect, useReducer } from 'react'

import { MdSettings, MdClose, MdKeyboardBackspace } from 'react-icons/md';

import { ModalOverlay, ColorPicker  } from '../../components'

import * as S from './styles'
import { useMouse, useCanvasCenter } from '../../useHooks'
import { drawFrattali } from './draw'

const defaultState = {
  lines:[{
    color: 'white',
    points: [],
    frattali: 30,
    effect: null
  }],
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
        effect: lastLine.effect,
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
    case "LINES_NEW":{
      return payload
    }
    case "LINE_CLEAR":
      return defaultState.lines
    default:
      return defaultState.lines
  }
}


function getUpdatedStoryline(storyline, state){
  // aggiorna la storia, aggiunge uno stato
  const lastStory = storyline[storyline.length - 1]
  if(lastStory){
    return [
      ...(storyline.slice(0, storyline.length -1 ) || []),
      {
        ...lastStory,
        isCurrent: false,
      },
      {
        ...state,
        isCurrent: true,
      }]
  }
  return[
    {
    ...state,
    isCurrent: true,
  }]
}

function getPreviousState(storyline){
  if(!storyline || !storyline.length) return
  const currentStoryIndex = storyline.findIndex(({isCurrent}) => isCurrent)

  if(storyline[currentStoryIndex - 1 ]){
    const { lines,frattali, color, effect } = storyline[currentStoryIndex -1]

    return {
      lines: {type: "LINES_NEW", payload: lines},
      frattali,
      color,
      effect,
      storyline: [
        ...storyline.slice(0, currentStoryIndex - 1),
        {
          ...storyline[currentStoryIndex - 1],
          isCurrent: true,
        }
      ]
    }
  }
  return null

}



export default ({width, height}) => {
  const canvas = useRef(null);
  const { mousePosition, mouseStatus }  = useMouse(canvas) 
  const { canvasCenter } =  useCanvasCenter(canvas)
  const [ lines, setLines] = useReducer(linesReducer, defaultState.lines);
  const [ frattali, setFrattali ] =  useState(30)
  const [ effect, setEffect ] =  useState(null)
  const [ color, setColor ] = useState("white")
  const [ storyline, setStory] = useState([])
  const [ isModalOpen, setModal ] = useState(null)

  useEffect(() => {
    if(!lines )return
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l]
      if(!line || !line.points.length) return
      drawFrattali({ctx: canvas.current.getContext("2d"), line, canvasCenter})
    }  
  }, [lines]);

  function goBack(storyline){
    const previousState = getPreviousState(storyline)
    if(previousState){
      const {frattali, lines, color, effect, storyline } = previousState
      setColor(color)
      setFrattali(frattali)
      setEffect(effect)
      setStory(storyline)
      canvas.current.getContext("2d").clearRect(0, 0, width, height)
      setLines(lines)
      setLines({type:'LINE_ADD'})
    }
  }

  useEffect(() => {
    if(mouseStatus === "mouseup"){
      
      if(!lines || !lines[lines.length - 1].points.length) return


      setLines({type:'LINE_ADD'})
      const updatedStoryline = getUpdatedStoryline(storyline, {
        lines, 
        frattali,
        color,
        effect
      })
      setStory(updatedStoryline)
    }
    if(mouseStatus === "mousedown"){
      setLines({type:'LINE_POINT_ADD', payload: {...mousePosition, timestamp: new Date().getTime()}})
    }
  }, [mousePosition, mouseStatus]);

  return(
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
      </S.CanvasInner>
      <S.Controllers>

        <S.Controller onClick={() =>{
          setLines({type:'LINE_CLEAR'})
          setStory([])
          canvas.current.getContext("2d").clearRect(0, 0, width, height)
        }}><MdClose /></S.Controller>
        
        <S.Controller onClick={() => goBack(storyline)}><MdKeyboardBackspace /></S.Controller>
        <S.Controller onClick={() => setModal(true)}><MdSettings /></S.Controller>
      </S.Controllers>
      
      {
        isModalOpen && (
          <ModalOverlay handleClose={setModal}>
            <S.Panel>
              <S.PanelBlock>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      frattali: frattali -1
                    }})
                    setFrattali(frattali-1)
                  }}
                >Frattali -1
                </S.PanelInner>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      frattali: frattali +1
                    }})
                    setFrattali(frattali+1)
                  }}
                >Frattali +1
                </S.PanelInner>
              </S.PanelBlock>
              <S.PanelBlock>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      effect: "noise"
                    }})
                    setEffect("noise")
                    setModal(false)
                  }}
                  isActive={effect === "noise"}
                >
                  Noise
                </S.PanelInner>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      effect: "tree"
                    }})
                    setEffect("tree")
                    setModal(false)
                  }}
                  isActive={effect === "tree"}
                >
                  tree
                </S.PanelInner>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      effect: "japanese"
                    }})
                    setEffect("japanese")
                    setModal(false)
                  }}
                  isActive={effect === "japanese"}
                >
                  japanese
                </S.PanelInner>
                <S.PanelInner
                  onClick={() => {
                    setLines({type:'LINE_UPDATE', payload: {
                      effect: null
                    }})
                    setEffect(null)
                    setModal(false)
                  }}
                  isActive={effect === null}
                >
                  Line
                </S.PanelInner>
              </S.PanelBlock>
              <S.PanelBlock>
                <ColorPicker color={color} setColor={color => {
                  setLines({type:'LINE_UPDATE', payload: {
                    color
                  }})
                  setColor(color)
                }} />)
              </S.PanelBlock>
            </S.Panel>
          </ModalOverlay>)
      }
      
    </S.CanvasWrapper> 
  )

}