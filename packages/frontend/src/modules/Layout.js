import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Sidebar, UserDashboard, Button } from 'components'
import { MdViewList, MdExitToApp } from 'react-icons/md'
import styled from 'styled-components'

import { getUserPicture, getUserName } from './../Redux/auth/reducer'
import * as actions from './../Redux/auth/actions'

const Layout = ({ children, username, picture, links, logoutAuth }) => {
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(null)

  return (
    <>
      {children}
      <UserController>
        <Button onClick={() => setIsUserDashboardOpen(true)}>
          <MdViewList />
        </Button>
      </UserController>
      {isUserDashboardOpen && (
        <Sidebar direction="left" onClose={() => setIsUserDashboardOpen(false)}>
          <UserDashboard
            username={username}
            LinkComponent={Link}
            links={links}
            picture={picture}
            handleLogout={logoutAuth}
            LogoutIcon={MdExitToApp}
          />
        </Sidebar>
      )}
    </>
  )
}

const UserController = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
`

export default connect(
  state => ({
    picture: getUserPicture(state),
    username: getUserName(state),
  }),
  actions
)(Layout)
