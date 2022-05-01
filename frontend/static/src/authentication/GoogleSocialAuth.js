import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = (response) => {
      console.log(response);
      if (response.accessToken) {
        localStorage.setItem('current-user', JSON.stringify({key: response.accessToken}));
        console.log(JSON.parse(localStorage.getItem('current-user')).key);
      }
    }


    return (
      <div className="google-auth">
      
        <GoogleLogin
          id="google-login"
          clientId= {`${GOOGLE_CLIENT_ID}`}
          buttonText="Login with Google"
          onSuccess={googleResponse}
          onFailure={googleResponse}
          
        />
      </div>
    );
  }
}
export default GoogleSocialAuth;