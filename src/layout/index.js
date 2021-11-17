import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "./app-bar";
import Footer from "./footer";

const Layout = (props) => {
    return (
        <React.Fragment>
            <AppBar onToggleTheme={props.onToggleTheme}/>

            <main>
                {props.hero ? props.hero : ''}
                {props.children}
            </main>

            <Footer />
        </React.Fragment>
    );
};

Layout.propTypes = {
    hero: PropTypes.element,
};

export default Layout;
