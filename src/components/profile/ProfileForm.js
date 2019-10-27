import React, { Component } from "react";
import { isEqual } from "lodash";
import { profiles } from "./../../providers/api";
import MultiSelectTag from "./../global/MultiSelectTag";

class ProfileForm extends Component {
	constructor() {
		super();

		this.state = {
			isNewUser: false,
			profileData: {
				bio: "",
				cohort: "",
				name: "",
				tags: []
			}
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnChange({ target }) {
		this.setState(state => ({
			profileData: {
				...state.profileData,
				[target.id]: target.value
			}
		}));
	}

	handleOnSubmit() {
		const formattedData = {
			...this.state.profileData,
			tags: this.state.profileData.tags.map(({ value }) => value)
		};

		if (this.props.isNewUser) {
			profiles.post(formattedData);
		} else {
			profiles.put(formattedData, formattedData.id);
		}
	}

	componentDidUpdate(prevProps) {
		if (isEqual(this.props.userProfile, prevProps.userProfile)) return;

		this.setState({ profileData: this.props.userProfile });
	}

	render() {
		const { isNewUser } = this.props;
		const { profileData } = this.state;

		return <div className="w-75 m-auto">
			<h4 className="mb-4">{isNewUser ? "Create" : ""} Your Profile</h4>

			<div className="row">
				<div className="form-group col-sm-12 col-md-6 row">
					<label htmlFor="name" className="col-sm-2">Name</label>

					<input
						className="form-control col-sm-10"
						id="name"
						onChange={this.handleOnChange}
						type="text"
						value={profileData.name}
					/>
				</div>

				<div className="form-group col-sm-12 col-md-6 row">
					<label htmlFor="cohort" className="col-sm-2 mr-2">Cohort</label>

					<input
						className="form-control col-sm-8"
						id="cohort"
						onChange={this.handleOnChange}
						type="text"
						value={profileData.cohort}
					/>
				</div>
			</div>

			<div className="form-group">
				<label htmlFor="bio">Bio</label>

				<textarea
					className="form-control"
					id="bio"
					onChange={this.handleOnChange}
					rows="5"
					value={profileData.bio}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="tag">Tags</label>

				<MultiSelectTag
					id="tags"
					onChange={this.handleOnChange}
					tags={profileData.tags}
				/>
			</div>

			<div className="d-flex justify-content-between">
				<button
					className="btn btn-primary"
					onClick={this.handleOnSubmit}
				>
                    Save
				</button>
			</div>
		</div>;
	}
}

export default ProfileForm;