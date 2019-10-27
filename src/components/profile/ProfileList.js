import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group"; // ES6
import ProfileCard from "./ProfileCard";

class ProfileList extends Component {
	render() {
		const { handleAddTagFilter, profiles } = this.props;

		if (!profiles.length) {
			return <p>No profiles to show right now, sorry!</p>;
		}

		const ProfileCards = profiles.map(({ bio, cohort, id, name, tags }) => <ProfileCard
			bio={bio}
			cohort={cohort}
			handleAddTagFilter={handleAddTagFilter}
			key={id}
			name={name}
			tags={tags}
		/>);

		return <CSSTransitionGroup
			transitionName="profile-card"
			transitionEnterTimeout={500}
			transitionLeaveTimeout={500}>
			{ProfileCards}
		</CSSTransitionGroup>;
	}
}

export default ProfileList;