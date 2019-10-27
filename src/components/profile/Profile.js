import React, { Component, Fragment } from "react";
import ProfileForm from "./ProfileForm";

class Profile extends Component {
	render() {
		return <Fragment>
			<ProfileForm
				isNewUser={this.props.isNewUser}
				userProfile={this.props.userProfile}
			/>

			<hr className="w-75" />
		</Fragment>;
	}
}

export default Profile;