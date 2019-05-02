import React, { useState, useEffect } from 'react'
import { Fullscreen, Loading } from 'components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Auth from '../Auth/Auth'
import { isAuthenticated } from '../Redux/auth/reducer'
import * as actions from '../Redux/auth/actions'

function useLoadProfile(hash) {
  const [isLoadingProfile, setIsLoadingProfile] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (userProfile) {
      setIsLoadingProfile(false)
    }
  }, [userProfile])

  useEffect(() => {
    if (isLoadingProfile) {
      const auth = new Auth()
      auth
        .getUserProfile(hash)
        .then(result => {
          setUserProfile(result)
        })
        .catch(e => {
          setIsLoadingProfile(false)
        })
    }
  }, [isLoadingProfile])

  useEffect(() => {
    setIsLoadingProfile(true)
  }, [])

  return {
    isLoadingProfile,
    userProfile,
  }
}

const LoadUserConnected = ({
  location,
  isAuthenticated,
  failAuth,
  setAuth,
}) => {
  const { userProfile, isLoadingProfile } = useLoadProfile(location.hash)

  useEffect(() => {
    if (userProfile && !isLoadingProfile) {
      if (userProfile.error) {
        failAuth('err settaggio user' || userProfile.error)
      }
      setAuth(userProfile)
    }
  }, [userProfile, isLoadingProfile])

  if (isAuthenticated) {
    return <Redirect to="welcomeuser" />
  }
  return (
    <Fullscreen backgroundColor="black">
      <Loading />
    </Fullscreen>
  )
}

const LoadUser = connect(
  state => ({
    isAuthenticated: isAuthenticated(state),
  }),
  actions
)(LoadUserConnected)

export default LoadUser
