import React from 'react';
import {connect} from 'react-redux';
import SignInForm from '../components/sign-in-form';

export default function createComponentWithLoginScreen(ChildComponent) {
    const mapStateToProps = state => ({user: state.auth.user});

    const RequireLoginHOC = (props) => {
        if (props.user.uid === undefined) {
            return <SignInForm />
        }

        return <ChildComponent {...props} />
    };

    return connect(mapStateToProps)(RequireLoginHOC);
};
