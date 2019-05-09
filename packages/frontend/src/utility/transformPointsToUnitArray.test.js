import transformPointsToUnitArray from './transformPointsToUnitArray'

describe('transformPointsToUnitArray', () => {
  test('easy transform', () => {
    const points = [
      {
        x: 10,
        y: 30,
      },
    ]
    expect(transformPointsToUnitArray(points)).toEqual(new Int32Array([10, 30]))
  })
  test('easy transform', () => {
    const points = [
      {
        x: 10,
        y: 30,
      },
      {
        x: 10,
        y: 30,
      },
      {
        x: 10,
        y: 30,
      },
      {
        x: 10,
        y: 30,
      },
    ]
    expect(transformPointsToUnitArray(points)).toEqual(
      new Int32Array([10, 30, 10, 30, 10, 30, 10, 30])
    )
  })
})
