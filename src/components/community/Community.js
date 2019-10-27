import React, { Component } from "react";

import { profiles } from "../../providers/api";

import "./Community.scss";

class Community extends Component {
    constructor() {
        super();

        this.state = {
            community: []
        };
    }

    async componentDidMount() {
        const community = await profiles.get();
        this.setState({ community: community.data });
    }
    render() {
        const { community } = this.state;

        return <div className="community-wrapper card-columns">
            {community.map(member => <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{member.cohort}</h6>
                    <p className="card-text">{member.bio}</p>
                </div>
            </div>

            )}</div>;
    }
}

export default Community;