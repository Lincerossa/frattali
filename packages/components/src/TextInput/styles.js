import styled from 'styled-components'

export const TextInput = styled.input`
  color: white;
  padding: 0.25rem 0;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.main};
  font-weight: 300;
  background: none;
  outline: none;
  width: 100%;
  &:focus,
  &:active {
    outline: none;
  }
`
