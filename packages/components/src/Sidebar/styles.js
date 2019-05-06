import styled from 'styled-components'

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: ${props => props.theme.colors.dark};
  overflow-y: scroll;
  padding: 1rem;
  padding-top: 2.5rem;
  z-index: 1;

  width: 280px;
  ${props =>
    props.direction === 'right' &&
    `
    right: -280px;
  `}
  ${props =>
    props.direction === 'left' &&
    `
    left: -280px;
  `}
`

export const Close = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.main};
    border: 2px solid ${props => props.theme.colors.main};
  }
`

export const SidebarOpacity = styled.div`
  position: absoliute;
`
