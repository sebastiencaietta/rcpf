import React from 'react';
import './nav-bar.css';
import {Link} from 'react-router-dom';

export default () => (
    <div className="row nav-bar">
        <div className="col-sm-12">
            <Link to="/">
                <h1>RCP</h1>
            </Link>
        </div>
    </div>
)
