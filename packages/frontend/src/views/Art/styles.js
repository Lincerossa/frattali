import styled from 'styled-components'

export const CanvasWrapper = styled.div`
  position: relative;
  min-height: ${props => (props.fullheight ? '100vh' : '200px')};
`

export const Controllers = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PanelBlock = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-family: sans-serif;
  font-size: 1.125rem;
  border-bottom: 1px solid #ffffff3b;
  &:last-of-type {
    border-bottom: none;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
`

export const PanelBlockTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-family: serif;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.04rem;
  text-transform: uppercase;
`
