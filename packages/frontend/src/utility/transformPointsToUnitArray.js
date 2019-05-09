export default arr => {
  const accumulated = arr.reduce((acc, val) => {
    return [...acc, val.x, val.y]
  }, [])

  return new Int32Array(accumulated)
}
