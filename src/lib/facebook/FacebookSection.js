import PropTypes from 'prop-types';
import React from 'react';
import logo from './fb-logo.png';

import './facebook.css';

const facebookApiUrl = 'https://connect.facebook.net/en_US/sdk.js';
const facebookScriptId = 'facebook-login';

// Docs
// https://developers.facebook.com/apps/

/*global FB*/
class FacebookSection extends React.Component {

    componentDidMount = () => {
        var found = false;
        const elements = document.getElementsByTagName('script')
        if (elements.length > 0) {
            for (let index = 0; index < elements.length; index++) {
                if (elements[index].src === facebookApiUrl) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            console.log('Facebook API - already found in page');
            this.startApp();
        }
        else {
            console.log('Facebook API - not found in page so we add it');
            let scriptElement = document.createElement('script');
            scriptElement.id = facebookScriptId;
            scriptElement.onload = this.startApp;
            scriptElement.src = facebookApiUrl;
            document.head.append(scriptElement)
        }
    }

    loginClick = () => {
        const scope = this;
        FB.login(function (response) {
            if (response.authResponse) {
                let facebookAuthResponse = response.authResponse;
                FB.api('/me', function (facebookProfile) {
                    scope.onSuccess({ facebookProfile, facebookAuthResponse });
                });
            } else {
                this.onFailure(response);
            }
        });
    }

    onSuccess = (facebookProfile) => {
        console.dir('Good to see you, ' + facebookProfile.name + '.');
        console.dir(facebookProfile);
        if (this.props.onSuccess)
            this.props.onSuccess(facebookProfile);
    }

    onFailure = (error) => {
        if (this.props.onFailure)
            this.props.onFailure(error);
    }

    startApp = () => {
        FB.init({
            appId: this.props.appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.2'
        });
    }

    render() {
        return (
            <div>
                <div id="facebookLoginButton" onClick={this.loginClick} >
                    <img src={logo} alt='Facebook logo' style={{ width: 50, height: 50, cursor: 'pointer' }} />
                </div>
            </div>
        )
    }
}

FacebookSection.propTypes = {
    appId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
};

export default FacebookSection;
