import React, { Component } from 'react';
import { api } from '../providers/api';

class Main extends Component {
    componentDidMount() {
        api.get(`/items`)
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        return <div>Main</div>
    }
};

export default Main;