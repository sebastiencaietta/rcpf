import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

export const initBugsnapApp = () => {
    Bugsnag.start({
        apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
        plugins: [new BugsnagPluginReact()]
    });
}

export const getErrorBoundary = () => {
    return Bugsnag.getPlugin('react').createErrorBoundary(React)
}
