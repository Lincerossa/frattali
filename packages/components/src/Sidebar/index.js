import React, { useRef, useEffect } from 'react'
import anime from 'animejs'
import { MdClose } from 'react-icons/md'
import * as S from './styles'

export default ({ children, onClose, direction = 'right' }) => {
  const sidebar = useRef()

  function handleClose() {
    if (window.innerWidth < 768) {
      onClose()
      return
    }
    anime({
      targets: sidebar.current,
      duration: 250,
      easing: 'easeInOutExpo',
      ...(direction === 'right' && { right: '-400px' }),
      ...(direction === 'left' && { left: '-400px' }),
      complete: () => {
        onClose()
      },
    })
  }

  useEffect(() => {
    if (!sidebar.current) return

    anime({
      targets: sidebar.current,
      duration: 250,
      easing: 'easeInOutExpo',
      ...(direction === 'right' && { right: '0' }),
      ...(direction === 'left' && { left: '0' }),
    })
  }, [sidebar])

  return (
    <S.Sidebar ref={sidebar} direction={direction}>
      <S.Close onClick={handleClose}>
        <MdClose />
      </S.Close>
      {children}
    </S.Sidebar>
  )
}
