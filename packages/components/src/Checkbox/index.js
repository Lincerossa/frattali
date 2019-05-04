import React, { useRef, useState, useEffect } from 'react'
import anime from 'animejs'

import * as S from './styles'
import Label from '../Label'

export default ({ checked, label, onClick }) => {
  const magic = useRef(null)
  const [isAnimating, setIsAnimating] = useState(null)
  const [innerCheck, setInnerCheck] = useState(checked)

  // e ok
  useEffect(() => {
    if (checked) {
      anime({
        targets: magic.current,
        width: innerCheck ? '40px' : '0',
        height: innerCheck ? '40px' : '0',
        duration: 0,
      })
    }
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    anime({
      targets: magic.current,
      width: !innerCheck ? '40px' : '0',
      height: !innerCheck ? '40px' : '0',
      easing: 'easeInOutExpo',
      duration: 500,
      complete: () => {
        setIsAnimating(false)
        setInnerCheck(!innerCheck)
      },
    })
  }, [isAnimating])

  useEffect(() => {
    if (innerCheck === checked) return
    onClick(innerCheck)
  }, [innerCheck])

  function handleClick() {
    if (isAnimating) return

    setIsAnimating(true)
  }

  return (
    <>
      {label && <Label>{label}</Label>}
      <S.Checkbox onClick={handleClick} checked={innerCheck}>
        <S.CheckboxCircle ref={magic} />
      </S.Checkbox>
    </>
  )
}
