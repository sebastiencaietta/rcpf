import React from 'react';
import {connect} from 'react-redux';
import SignInForm from '../containers/sign-in-form';

export const requiresLogin = function createComponentWithLoginScreen(ChildComponent) {
    const mapStateToProps = state => ({user: state.auth.user});

    const RequireLoginHOC = (props) => {
        if (props.user.uid === undefined) {
            return <SignInForm />
        }

        return <ChildComponent {...props} />
    };

    return connect(mapStateToProps)(RequireLoginHOC);
};
