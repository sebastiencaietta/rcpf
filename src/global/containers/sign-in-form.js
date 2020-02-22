import {connect} from 'react-redux';
import SignInForm from '../components/sign-in-form';
import {LOADING, SIGNIN_ERROR} from "../types/auth";
import {signUserIn} from "../eve";

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.signinError
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (email, password) => {
        dispatch({type: LOADING, payload: true});
        signUserIn(email, password)
            .then(response => console.log(response))
            .catch(error => dispatch({type: SIGNIN_ERROR, payload: error}))
            .finally(response => {dispatch({type: LOADING, payload: false})});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
