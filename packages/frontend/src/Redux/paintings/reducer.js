import produce from 'immer'

import { PAINTING_SAVE, PAINTING_REMOVE, PAINTING_EMPTY } from './types.js'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case PAINTING_SAVE:
      // il disegno esiste già, allora ne salva la nuova versione
      if (
        state &&
        state.length > 0 &&
        state.find(e => e.id === action.payload.id) !== undefined
      ) {
        return produce(state, draftState => {
          draftState[draftState.findIndex(e => e.id === action.payload.id)] =
            action.payload
        })
      }
      return [...state, action.payload]
    case PAINTING_REMOVE:
      // il disegno effettivamente esiste già, allora lo rimuovo
      if (
        state &&
        state.length > 0 &&
        state.find(e => e.id === action.payload) !== undefined
      ) {
        const indexOfTheElementToRemove = state.findIndex(
          e => e.id === action.payload
        )
        return [
          ...state.slice(0, indexOfTheElementToRemove),
          ...state.slice(indexOfTheElementToRemove + 1),
        ]
      }
      return state

    case PAINTING_EMPTY:
      return initialState
    default:
      return state
  }
}
