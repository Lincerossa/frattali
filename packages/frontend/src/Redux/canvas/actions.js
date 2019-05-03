import {
  CANVAS_POINT_ADD,
  CANVAS_LINE_ADD,
  CANVAS_LINE_SETTINGS_UPDATE,
  CANVAS_CLEAR,
  CANVAS_TITLE_SET,
  CANVAS_HD_SET,
  CANVAS_BACKGROUND_SET,
} from './types'

export const addCanvasPoint = payload => ({
  type: CANVAS_POINT_ADD,
  payload,
})
export const addCanvasLine = () => ({
  type: CANVAS_LINE_ADD,
})

export const updateCanvasLineSettings = payload => ({
  type: CANVAS_LINE_SETTINGS_UPDATE,
  payload,
})

export const clearCanvas = () => ({
  type: CANVAS_CLEAR,
})

export const setCanvasTitle = payload => ({
  type: CANVAS_TITLE_SET,
  payload,
})
export const setCanvasHd = payload => ({
  type: CANVAS_HD_SET,
  payload,
})
export const setCanvasBackground = payload => ({
  type: CANVAS_BACKGROUND_SET,
  payload,
})
