import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Sizeme,
  Button,
  Canvas,
  ColorPicker,
  InputRange,
  Sidebar,
  Checkbox,
} from 'components'
import { MdSettings, MdClose } from 'react-icons/md'
import { getUserPicture } from '../../Redux/auth/reducer'
import {
  getCanvasLines,
  getCanvasTitle,
  getCanvasBackground,
  getCanvasHd,
} from '../../Redux/canvas/reducer'
import * as actions from '../../Redux/canvas/actions'

import * as S from './styles'

function useMouse() {
  const [mousePosition, setMousePosition] = useState(null)
  const [mouseStatus, setMouseStatus] = useState(null)

  function handleMouseDown() {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove, { passive: false })
    window.addEventListener('touchend', handleMouseUp)
    setMouseStatus('mousedown')
  }

  function handleTouchStart(e) {
    handleMouseMove(e)
    handleMouseDown()
  }

  function handleMouseUp() {
    setMouseStatus('mouseup')
  }

  function handleMouseMove(e) {
    setMousePosition({
      x: e.clientX || (e.touches && e.touches[0].clientX),
      y: e.clientY || (e.touches && e.touches[0].clientY),
    })
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.addEventListener('touchstart', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
    }
  }, [])

  return {
    mousePosition,
    mouseStatus,
  }
}

const Art = ({
  picture,
  canvasTitle,
  canvasBackground,
  canvasLines,
  canvasHd,
  addCanvasPoint,
  addCanvasLine,
  updateCanvasLineSettings,
  clearCanvas,
  setCanvasTitle,
  setCanvasHd,
  setCanvasBackground,
}) => {
  const { mousePosition, mouseStatus } = useMouse()
  const [isSidebarOpen, toggleSidebar] = useState(null)

  useEffect(() => {
    if (
      mouseStatus === 'mouseup' &&
      canvasLines &&
      canvasLines[canvasLines.length - 1].points.length
    ) {
      addCanvasLine()
    }
  }, [mouseStatus])

  useEffect(() => {
    if (mouseStatus === 'mousedown' && mousePosition) {
      addCanvasPoint({
        x: mousePosition.x - window.innerWidth / 2,
        y: window.innerHeight / 2 - mousePosition.y,
      })
    }
  }, [mousePosition, mouseStatus])

  const lastCanvasLine = canvasLines[canvasLines.length - 1]
  const { divisions, color, thickness } = lastCanvasLine

  return (
    <S.Art>
      <Canvas
        hd={canvasHd}
        lines={canvasLines}
        backgroundColor={canvasBackground}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <S.Controllers>
        <Button onClick={clearCanvas}>
          <MdClose />
        </Button>
        <Button onClick={() => toggleSidebar(true)}>
          <MdSettings />
        </Button>
        <Button backgroundImage={picture} />
      </S.Controllers>

      {isSidebarOpen && (
        <Sidebar onClose={() => toggleSidebar(false)}>
          <S.PanelBlock>
            <S.PanelBlockTitle>example</S.PanelBlockTitle>
            <Sizeme>
              {({ size }) => (
                <S.CanvasWrapper>
                  <Canvas
                    {...size}
                    backgroundColor={canvasBackground}
                    lines={[
                      {
                        divisions,
                        color,
                        thickness,
                        points: Array.from({ length: 20 }, (index, e) => ({
                          x: 0,
                          y: e * 4 + 30,
                        })),
                      },
                    ]}
                  />
                </S.CanvasWrapper>
              )}
            </Sizeme>
          </S.PanelBlock>
          <S.PanelBlock>
            <InputRange
              label="divisions"
              min={1}
              max={200}
              value={divisions}
              onChange={divisions => updateCanvasLineSettings({ divisions })}
            />
          </S.PanelBlock>
          <S.PanelBlock>
            <InputRange
              label="line width"
              min={1}
              max={10}
              value={thickness}
              onChange={thickness => updateCanvasLineSettings({ thickness })}
            />
          </S.PanelBlock>
          <S.PanelBlock>
            <ColorPicker
              color={color}
              setColor={color => updateCanvasLineSettings({ color })}
              label="line color"
            />
          </S.PanelBlock>
          <S.PanelBlock>
            <Checkbox
              checked={canvasHd}
              onClick={setCanvasHd}
              label="Chose HD version"
            />
          </S.PanelBlock>
          <S.PanelBlock>
            <ColorPicker
              color={canvasBackground}
              setColor={setCanvasBackground}
              label="background color"
            />
          </S.PanelBlock>
        </Sidebar>
      )}
    </S.Art>
  )
}

export default connect(
  state => ({
    picture: getUserPicture(state),
    canvasLines: getCanvasLines(state),
    canvasTitle: getCanvasTitle(state),
    canvasBackground: getCanvasBackground(state),
    canvasHd: getCanvasHd(state),
  }),
  actions
)(Art)
