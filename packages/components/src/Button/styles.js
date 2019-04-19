import styled from "styled-components";

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
background-color: violet;
color: white;
background-color: violet;
margin-right: .5rem;
background-size: cover;
background-position: center center;
background-image: url("${props => props.backgroundImage}");

&:last-of-type{
  margin:0;
}
&:active{
  background-color: white;
  color: violet;
}
&:focus{
  outline: none;
}

@media screen and (min-width: 600px) {
  &:hover{
    background-color: white;
    color: violet;
  }
}
`;
