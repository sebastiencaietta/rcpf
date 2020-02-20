import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {USER_UPDATED} from "./global/types/auth";
import {onUserUpdate} from "./repositories/users";

const mapDispatchToProps = dispatch => {
    return {
        initUser: (user) => dispatch({type: USER_UPDATED, payload: user})
    }
};

const AuthComponent = ({initUser}) => {
    useEffect(() => {
        onUserUpdate(function(user) {
            if (user) {
                initUser(user);
            } else {
                initUser(null);
            }
        })
    }, []);


    return <Fragment>
        <div>test</div>
    </Fragment>
};

export default connect(null, mapDispatchToProps)(AuthComponent)
