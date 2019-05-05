import produce from 'immer'
import uuidv5 from 'uuid'
import {
  CANVAS_POINT_ADD,
  CANVAS_LINE_ADD,
  CANVAS_LINE_SETTINGS_UPDATE,
  CANVAS_CLEAR,
  CANVAS_TITLE_SET,
  CANVAS_HD_SET,
  CANVAS_BACKGROUND_SET,
} from './types'

const defaultState = {
  title: 'main canvas',
  background: 'violet',
  hd: false,
  id: uuidv5(),
  lines: [
    {
      color: 'black',
      points: [],
      divisions: 50,
      thickness: 1,
    },
  ],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CANVAS_POINT_ADD:
      return produce(state, draftState => {
        draftState.lines[draftState.lines.length - 1].points.push(
          action.payload
        )
      })

    case CANVAS_LINE_ADD:
      return produce(state, draftState => {
        draftState.lines.push({
          ...draftState.lines[draftState.lines.length - 1],
          points: [],
        })
      })

    case CANVAS_LINE_SETTINGS_UPDATE:
      // AGGIORNA L'ULTIMA LINEA (es. ne cambia colore dal panellino ecc ecc)
      return produce(state, draftState => {
        draftState.lines[draftState.lines.length - 1] = {
          ...draftState.lines[draftState.lines.length - 1],
          ...action.payload,
        }
      })

    case CANVAS_TITLE_SET:
      return {
        ...state,
        title: action.payload,
      }
    case CANVAS_HD_SET:
      return {
        ...state,
        hd: action.payload,
      }
    case CANVAS_BACKGROUND_SET:
      return {
        ...state,
        background: action.payload,
      }

    case CANVAS_CLEAR:
      return defaultState

    default:
      return state
  }
}

export const getCanvasLines = state => state.canvas.lines
export const getCanvasTitle = state => state.canvas.title
export const getCanvasBackground = state => state.canvas.background
export const getCanvasHd = state => state.canvas.hd
export const getCanvas = state => state.canvas
