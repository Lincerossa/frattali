import styled from 'styled-components'

export const UserDashboard = styled.div`
  padding: 0.5rem;
`
export const Username = styled.div`
  font-size: 1.5rem;
  color: white;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-top: 1px solid ${props => props.theme.colors.main};
  border-bottom: 1px solid ${props => props.theme.colors.main};
  text-transform: uppercase;
`

export const ImageWrapper = styled.div`
  margin-bottom: 1rem;
`

export const LinkWrapper = styled.div`
  margin-bottom: 1rem;
  a {
    color: white;
    text-decoration: none;
  }
`

export const LogoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
