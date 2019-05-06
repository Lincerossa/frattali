import styled from 'styled-components'

export const Fullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  ${props =>
    props.opacity &&
    `
    opacity: ${props.opacity}
  `};
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.backgroundColor &&
    `
    background-color: ${props.backgroundColor};
  `}
`
