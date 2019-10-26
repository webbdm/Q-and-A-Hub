import React from 'react';
import Align from './layout/Align';
import { Link } from "react-router-dom";

const Header = () => {
    return <header className="App-header">
        <Align>
            <span>Q and A</span>

            <Link to="/">Profile</Link>

            <Link to="/question">Question</Link>
        </Align>
    </header>
};

export default Header;