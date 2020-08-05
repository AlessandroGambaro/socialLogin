import React from 'react';

import FacebookSection from './lib/facebook/FacebookSection';
import GoogleSection from './lib/google/GoogleSection';

function App() {

  /**
   * Call this api and get the token, save it in your state
   * @param {data from facebook} facebookProfile 
   */
  const facebookOnSuccess = (facebookProfile) => {
    console.log('Facebook success', facebookProfile);
  }

  /**
   * @param {error from facebook} error 
   */
  const facebookOnFailure = (error) => {
    console.log(error);
  }

  /**
   * Call this api and get the token, save it in your state
   * @param {data from Facebook} googleProfile
   */
  const googleOnSuccess = (googleProfile) => {
    console.log('Google success', googleProfile);
  }

  /**
   * @param {error from Google} error
   */
  const googleOnFailure = (error) => {
    console.log(error);
  }

  return (
    <React.Fragment>
      <center>
        {/* OAuth 2.0 Client IDs, https://console.developers.google.com/apis/credentials does not work in Chrome */}
        <GoogleSection clientId='733150640280-ov5eit9ar8dfmi838nr7ihqtaaoqcl00.apps.googleusercontent.com' onFailure={googleOnFailure} onSuccess={googleOnSuccess} />
        <br />
        {/* https://console.developers.google.com/apis/credentials */}
        <FacebookSection appId='2351693135110867' onFailure={facebookOnFailure} onSuccess={facebookOnSuccess} />
      </center>
    </React.Fragment>
  );
}

export default App;
