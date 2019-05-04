import styled from 'styled-components'

export const Checkbox = styled.div`
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-color: white;
  position: relative;
  border: 1px solid ${props => props.theme.colors.main};
  overflow: hidden;
`

export const CheckboxCircle = styled.div`
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: ${props => props.theme.colors.main};
`
