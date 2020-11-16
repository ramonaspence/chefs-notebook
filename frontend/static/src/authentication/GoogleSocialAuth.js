import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = (response) => {
      console.log(response);
    }
    return (
      <div className="App">
      
        <GoogleLogin
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