import React from 'react';
import {connect} from 'react-redux';
import SignInForm from '../containers/sign-in-form';

const mapStateToProps = state => ({user: state.auth.user});

const SignInPage = ({user, children}) => {
    if (user.uid === undefined) {
        return <SignInForm />
    }

    return children;
};

export default connect(mapStateToProps)(SignInPage);
