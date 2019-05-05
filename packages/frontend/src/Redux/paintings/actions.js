import { PAINTING_SAVE, PAINTING_REMOVE, PAINTING_EMPTY } from './types.js'

export const savePainting = payload => ({
  type: PAINTING_SAVE,
  payload,
})
export const removePainting = payload => ({
  type: PAINTING_REMOVE,
  payload,
})
export const emptyPainting = () => ({
  type: PAINTING_EMPTY,
})
