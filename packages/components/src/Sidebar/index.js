import React, { useRef, useEffect } from 'react'
import anime from 'animejs'
import { MdClose } from 'react-icons/md'
import * as S from './styles'

export default ({ children, onClose }) => {
  const sidebar = useRef()

  function handleClose() {
    if (window.innerWidth < 768) {
      onClose()
      return
    }
    anime({
      targets: sidebar.current,
      easing: 'easeInOutExpo',
      right: '-400px',
      complete: () => {
        onClose()
      },
    })
  }

  useEffect(() => {
    if (!sidebar.current) return

    anime({
      targets: sidebar.current,
      easing: 'easeInOutExpo',
      right: 0,
    })
  }, [sidebar])

  return (
    <S.Sidebar ref={sidebar}>
      <S.Close onClick={handleClose}>
        <MdClose />
      </S.Close>
      {children}
    </S.Sidebar>
  )
}
