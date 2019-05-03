import auth0 from 'auth0-js'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'geoideas.auth0.com',
    clientID: 'lXyjMT1ERhZJE3RE35cS8rlllIo2XGht',
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT,
    responseType: 'token id_token',
    scope: 'openid profile email read:users user_id id',
  })

  login() {
    this.auth0.authorize()
  }

  getUserProfile(hash) {
    return new Promise((resolve, reject) => {
      try {
        this.auth0.parseHash({ hash }, (err, authResult) => {
          if (err) {
            console.log(err)
          }

          if (!authResult) return
          const { accessToken } = authResult
          this.auth0.client.userInfo(accessToken, (err, user) => {
            resolve({ ...user, accessToken })
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
