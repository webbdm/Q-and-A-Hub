import React from 'react';
import { connect } from 'react-redux';
import Align from './layout/Align';


const mapStateToProps = ({ appReducer }) => {
    return {
        appName: appReducer.appName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        helloWorld: () => console.log('Hello World')
    }
};

const Header = ({ appName }) => {
    return <header className="App-header">
        <Align>{appName}</Align>
    </header>
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);