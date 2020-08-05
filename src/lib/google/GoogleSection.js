import PropTypes from 'prop-types';
import React from 'react';
import logo from './google.ico';

import './google.css';
// const googleApiUrl = 'https://apis.google.com/js/api:client.js';
const googleApiUrl = 'https://apis.google.com/js/platform.js';
const googleScriptId = 'google-login';

// Docs
// https://console.developers.google.com/     --> Credentials OAuth 2.0 Client IDs
// https://developers.google.com/identity/sign-in/web/sign-in
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams

/* global gapi */
class GoogleSection extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            auth2: {}
        }
    }

    componentDidMount() {
        var found = false;
        const elements = document.getElementsByTagName('script')
        if (elements.length > 0) {
            for (let index = 0; index < elements.length; index++) {
                if (elements[index].src === googleApiUrl) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            console.log('Google API - already found in page');
            this.startApp();
        }
        else {
            console.log('Google API - not found in page so we add it');
            let scriptElement = document.createElement('script');
            scriptElement.id = googleScriptId;
            scriptElement.onload = this.startApp;
            scriptElement.src = googleApiUrl;
            document.head.append(scriptElement)
        }
    }

    attachSignin = (element) => {
        this.state.auth2.attachClickHandler(element, {}, this.onSuccess, this.onFailure);
    }

    onFailure = (error) => {
        if (this.props.onFailure)
            this.props.onFailure(error);
    }

    onSuccess = (googleUser) => {
        const googleProfile = googleUser.getBasicProfile();
        const googleAuthResponse = googleUser.getAuthResponse();

        if (this.props.onSuccess)
            this.props.onSuccess({ googleProfile, googleAuthResponse });
    }

    startApp = () => {
        const _this = this;
        const gClientId = this.props.clientId;

        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            let state = Object.assign({}, _this.state);
            state.auth2 = gapi.auth2.init({
                client_id: gClientId,
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });

            _this.setState(state, () => {
                _this.attachSignin(document.getElementById('googleLoginButton'));
            });
        });
    };

    render() {
        return (
            <div>
                <div id="googleLoginButton">
                    <img src={logo} alt='google icon' style={{ width: 50, height: 50 }} />
                </div>
            </div>
        )
    };
};

GoogleSection.propTypes = {
    clientId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
};

export default GoogleSection;
