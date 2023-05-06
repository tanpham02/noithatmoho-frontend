import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'

const GoogleLoginButton = () => {
  const [accessToken, setAccessToken] = useState('')

  const handleGoogleLoginSuccess = async (response) => {
    const { code } = response
    const url = `http://localhost:8080/login/oauth2/${code}/google`
    const tokenResponse = await fetch(url)
    const tokenData = await tokenResponse.json()
    setAccessToken(tokenData.access_token)
    console.log(url)
  }

  const handleGoogleLoginFailure = (error) => {
    console.error(error)
  }

  return (
    <GoogleLogin
      clientId="273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com"
      buttonText="Đăng nhập với Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLoginButton
