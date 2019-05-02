import React, { useState, useEffect } from 'react'
import { Fullscreen, Wrapper, Image } from 'components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserPicture } from '../Redux/auth/reducer'

function WelcomeUser({ userPicture, isAuthenticated }) {
  const [isWelcomeEnded, setIsWelcomeEnded] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWelcomeEnded(true)
    }, 2500)

    return () => clearTimeout(timeout)
  }, [])

  if (isWelcomeEnded) {
    return <Redirect to="/" />
  }

  return (
    <Fullscreen backgroundColor="red">
      <Wrapper>
        <Image picture={userPicture} />
      </Wrapper>
    </Fullscreen>
  )
}

const WelcomeUserConnected = connect(state => ({
  userPicture: getUserPicture(state),
}))(WelcomeUser)

export default WelcomeUserConnected
