import React from 'react'
import * as S from './styles'
import Image from '../Image'
export default ({
  username,
  picture,
  links,
  LinkComponent,
  handleClose,
  handleLogout,
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
    <div onClick={handleLogout}>logout</div>
  </S.UserDashboard>
)
