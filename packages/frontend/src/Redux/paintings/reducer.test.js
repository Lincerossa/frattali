import reducer from './reducer'

import * as actions from './actions'
describe('portfolio', () => {
  test('save a single element', () => {
    const state = []
    const action = actions.savePainting({
      id: 12,
      content: 'lorem lorem',
    })
    expect(reducer(state, action)).toEqual([
      {
        id: 12,
        content: 'lorem lorem',
      },
    ])
  })

  test('save another element with same id and it should return the updated version', () => {
    const state = [
      {
        id: 12,
        content: 'lorem lorem',
      },
    ]
    const action = actions.savePainting({
      id: 12,
      content: 'lorem lorem after',
    })
    expect(reducer(state, action)).toEqual([
      {
        id: 12,
        content: 'lorem lorem after',
      },
    ])
  })

  test('trying to remove an element', () => {
    const state = [
      {
        id: 12,
        content: 'lorem lorem',
      },
    ]
    const action = actions.removePainting(12)
    expect(reducer(state, action)).toEqual([])
  })

  test('trying to remove an element that doesnt exist', () => {
    const state = [
      {
        id: 12,
        content: 'lorem lorem',
      },
    ]
    const action = actions.removePainting(13)

    expect(reducer(state, action)).toEqual([
      {
        id: 12,
        content: 'lorem lorem',
      },
    ])
  })

  test('trying to remove an element with empty state', () => {
    const state = []
    const action = actions.removePainting(13)

    expect(reducer(state, action)).toEqual([])
  })
  test('trying to clear all', () => {
    const state = [
      {
        id: 12,
        content: 'lorem',
      },
    ]
    const action = actions.emptyPainting()

    expect(reducer(state, action)).toEqual([])
  })
})
