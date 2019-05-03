import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { Sizeme, Button, Canvas, ColorPicker, InputRange } from 'components'
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

function useMouse(element) {
  const [mousePosition, setMousePosition] = useState(null)
  const [mouseStatus, setMouseStatus] = useState(null)

  function handleMouseDown() {
    const el = element.current.parentNode
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseup', handleMouseUp)
    el.addEventListener('touchmove', handleMouseMove, { passive: false })
    el.addEventListener('touchend', handleMouseUp)
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
    const el = element.current.parentNode

    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('touchstart', handleTouchStart, { passive: false })

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      el.addEventListener('touchstart', handleMouseDown)
      el.removeEventListener('mouseup', handleMouseUp)
      el.removeEventListener('touchend', handleMouseUp)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('touchmove', handleMouseMove)
    }
  }, [element])

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
  const canvas = useRef(null)
  const { mousePosition, mouseStatus } = useMouse(canvas)
  const [isPanelOpen, openPanel] = useState(null)
  const [center, setCenter] = useState(null)

  useEffect(() => {
    if (!canvas || !canvas.current) return
    const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = canvas.current

    setCenter({
      y: offsetHeight / 2 - offsetTop,
      x: offsetWidth / 2 + offsetLeft,
    })
  }, [canvas, canvas.current])

  useEffect(() => {
    if (
      mouseStatus === 'mouseup' &&
      canvasLines &&
      canvasLines[canvasLines.length - 1].points.length
    ) {
      addCanvasLine()
    }
    if (mouseStatus === 'mousedown') {
      addCanvasPoint({
        // pt già sul piano cartesiano con coordinate del centro, quelle di center
        x: mousePosition.x - center.x,
        y: center.y - mousePosition.y,
      })
    }
  }, [mousePosition, mouseStatus === 'mouseup'])

  return (
    <>
      <Sizeme>
        {({ size }) => (
          <S.CanvasWrapper ref={canvas} fullheight>
            <Canvas
              hd={canvasHd}
              lines={canvasLines}
              backgroundColor={canvasBackground}
              {...size}
            />
          </S.CanvasWrapper>
        )}
      </Sizeme>
      <S.Controllers>
        <Button
          onClick={() => {
            clearCanvas()
          }}
        >
          <MdClose />
        </Button>
        <Button onClick={() => openPanel(true)}>
          <MdSettings />
        </Button>
        <Button backgroundImage={picture} />
      </S.Controllers>
      {isPanelOpen && (
        <S.Panel>
          <S.PanelClose onClick={() => openPanel(false)}>
            <MdClose />
          </S.PanelClose>
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
                        divisions:
                          canvasLines[canvasLines.length - 1].divisions,
                        color: canvasLines[canvasLines.length - 1].color,
                        thickness:
                          canvasLines[canvasLines.length - 1].thickness,
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
            <S.PanelBlockTitle>divisions</S.PanelBlockTitle>
            <S.ButtonsWrapper>
              <InputRange
                min="1"
                max="200"
                value={canvasLines[canvasLines.length - 1].divisions}
                onChange={divisions => updateCanvasLineSettings({ divisions })}
                step="1"
              />
            </S.ButtonsWrapper>
          </S.PanelBlock>
          <S.PanelBlock>
            <S.PanelBlockTitle>Line width</S.PanelBlockTitle>
            <S.ButtonsWrapper>
              <InputRange
                type="range"
                min="1"
                max="10"
                value={canvasLines[canvasLines.length - 1].thickness}
                onChange={thickness => updateCanvasLineSettings({ thickness })}
                step="1"
              />
            </S.ButtonsWrapper>
          </S.PanelBlock>
          <S.PanelBlock>
            <S.PanelBlockTitle>
              line color{' '}
              <S.ColorBlock color={canvasLines[canvasLines.length - 1].color} />{' '}
            </S.PanelBlockTitle>
            <ColorPicker
              color={canvasLines[canvasLines.length - 1].color}
              setColor={color => updateCanvasLineSettings({ color })}
            />
          </S.PanelBlock>

          <S.PanelBlock>
            <S.PanelBlockTitle>
              HD{' '}
              <div onClick={() => setCanvasHd(!canvasHd)}>
                {canvasHd ? 'ON' : 'OFF'}{' '}
              </div>
            </S.PanelBlockTitle>
          </S.PanelBlock>

          <S.PanelBlock>
            <S.PanelBlockTitle>
              background color <S.ColorBlock color={canvasBackground} />{' '}
            </S.PanelBlockTitle>
            <ColorPicker
              color={canvasBackground}
              setColor={setCanvasBackground}
            />
          </S.PanelBlock>
        </S.Panel>
      )}
    </>
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
