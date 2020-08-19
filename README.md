In this library you find two buttons that let you login using

 - facebook account
 - google account

gapi does not work in chrome (most of all if chrome is managed by the organization) by default, to make it works:

 * chrome://flags/ and set 'SameSite by default cookies' disabled

## Usage
1. Create credentials on 
   * Facebook: https://developers.facebook.com/apps 
   * Google: https://console.developers.google.com/apis/credentials
             https://developers.google.com/identity/sign-in/web/reference

2. Installation
 ```bash
npm i react-login-buttons
 ```

3. Import
 ```javascript
 import { FacebookButton, GoogleButton } from 'react-login-buttons';
 ```

4. Add buttons to the page
 ```javascript
<GoogleButton clientId='Your OAuth 2.0 Client IDs' onFailure={googleOnFailure} onSuccess={googleOnSuccess} />
<FacebookButton appId='Your Facebook App ID' onFailure={facebookOnFailure} onSuccess={facebookOnSuccess} />
 ```

5. Define the function to manage the callbacks

Google
```javascript
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
```

Facebook
```javascript
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
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Demo app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run distribute`

Builds (made for windows) the app for production to the `dist` folder.<br />
It correctly bundles the React component.

### `npm publish`

Publish the dist on npmjs.

## License
[MIT](https://choosealicense.com/licenses/mit/)