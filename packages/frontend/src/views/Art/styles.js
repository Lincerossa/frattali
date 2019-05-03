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

export const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #343434;
  overflow-y: scroll;
  padding: 1rem;
  padding-top: 2.5rem;
  @media screen and (min-width: 600px) {
    left: auto;
  }
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

export const ColorPicker = styled.div``
export const PanelClose = styled.div`
  color: white;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.main};
  }
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
