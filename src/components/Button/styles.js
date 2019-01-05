import styled from 'styled-components'

export const Button = styled.div`
font-size: 1.75rem;
position: relative;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;
border-radius: 50%;
height: 2.5rem;
width: 2.5rem;
border-radius: 50%;
background-color: ${props => props.theme.colors.main};
color: white;
margin-right: .5rem;

&:last-of-type{
  margin:0;
}
&:active{
  background-color: white;
  color: ${props => props.theme.colors.main};
}
&:focus{
  outline: none;
}

@media screen and (min-width: 600px) {
  &:hover{
    background-color: white;
    color: ${props => props.theme.colors.main};
  }
}
`