import styled from 'styled-components'

export const Panel = styled.div`
`

export const PanelBlock = styled.div`
  display: flex;
  margin-bottom: .5rem;
  border-bottom: 1px solid #ffffff61;
  padding-bottom: .5rem;
  font-family: sans-serif;
  font-size: 1.125rem;
`
export const PanelInner = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: .5rem;
  height: 1.5rem;
  color:  white;
  ${props => props.isActive && `
    color: white;
    color:  #ac00ff;
  `}

  &:hover{
    color: #ac00ff;
  }
`
