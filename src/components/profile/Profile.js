import React, { Component } from "react";
import ProfileForm from "./ProfileForm";
import ProfileList from "./ProfileList";
import MultiSelectTag from "./../global/MultiSelectTag";

class Profile extends Component {
	hrRef = null;

	state = {
		tagFilters: []
	};

	handleAddTagFilter = (tag) => {
		if (this.state.tagFilters.includes(tag)) return;
		this.setState(state => ({ tagFilters: [ ...state.tagFilters, tag ] }));
		this.hrRef.scrollIntoView({ behavior: "smooth" });
	}

	render() {
		const { profiles } = this.props;
		const { tagFilters } = this.state;

		const filteredProfiles = !tagFilters.length ? profiles : profiles.filter(({ tags }) => {
			return tags.find(tag => tagFilters.includes(tag));
		});
		const filteredTagCount = filteredProfiles.length;

		return <div className="">
			<ProfileForm
				isNewUser={this.props.isNewUser}
				setAuthedUserData={this.props.setAuthedUserData}
				userProfile={this.props.userProfile}
			/>

			<hr className="my-4" ref={ref => this.hrRef = ref} />

			<div className="d-flex">
				<div className="w-25 mr-2">
					<MultiSelectTag
						onChange={({ target }) => this.setState({ tagFilters: target.value })}
						placeholder="Filter profiles by tags..."
						tags={this.state.tagFilters}
					/>

					<small
						className="text-secondary"
					>
						{filteredTagCount} result{filteredTagCount > 1 ? "s" : ""}
					</small>
				</div>

				<div className="w-75">
					<ProfileList
						handleAddTagFilter={this.handleAddTagFilter}
						profiles={filteredProfiles}
					/>
				</div>
			</div>

		</div>;
	}
}

export default Profile;