import styled from 'styled-components'

export const ImageWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  width: 100%;
`

export const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("${props => props.picture}");
  background-size: cover;
  background-position: center center;
`
