import React from 'react'
import * as S from './styles'
import Image from '../Image'

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
    <S.ImageWrapper>
      <Image round picture={picture} />
    </S.ImageWrapper>
    <S.Username>{username}</S.Username>
    {links &&
      links.length > 0 &&
      links.map(({ text, link }) => (
        <S.LinkWrapper>
          <LinkComponent to={link}>{text}</LinkComponent>
        </S.LinkWrapper>
      ))}
    <S.LogoutWrapper>
      <Button onClick={handleLogout}>
        <LogoutIcon />
      </Button>
    </S.LogoutWrapper>
  </S.UserDashboard>
)
