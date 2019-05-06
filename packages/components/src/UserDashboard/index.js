import React from 'react'
import * as S from './styles'
import Image from '../Image'
import { MdArrowForward } from 'react-icons/md'
import Button from '../Button'

export default ({
  username,
  picture,
  links,
  LinkComponent,
  handleClose,
  handleLogout,
  LogoutIcon,
}) => (
  <S.UserDashboard>
    <LinkComponent to="/">
      <S.ImageWrapper>
        <Image round picture={picture} />
      </S.ImageWrapper>
    </LinkComponent>
    <S.Username>{username}</S.Username>
    {links &&
      links.length > 0 &&
      links.map(({ text, link }) => (
        <S.LinkWrapper>
          <LinkComponent to={link}>
            {text} <MdArrowForward />
          </LinkComponent>
        </S.LinkWrapper>
      ))}
    <S.LogoutWrapper>
      <Button onClick={handleLogout}>
        <LogoutIcon />
      </Button>
    </S.LogoutWrapper>
  </S.UserDashboard>
)
