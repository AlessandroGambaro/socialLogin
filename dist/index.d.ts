import React from 'react';
import PropTypes from 'prop-types';

declare module 'react-login-buttons' {

    declare function facebookOnSuccess(profile: any): void;

    class FacebookButton extends React.Component {
        props: {
            appId: string;
            onSuccess(facebookProfile: any): void;
            onFailure(error: any): void;
        };
    }

    class GoogleButton extends React.Component {
        props: {
            clientId: string;
            onSuccess(googleProfile: any): void;
            onFailure(error: any): void;
        };
    }

    export { FacebookButton, GoogleButton }
}
