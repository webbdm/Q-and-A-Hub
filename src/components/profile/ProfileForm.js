import React, { Component } from "react";
import { isEqual } from "lodash";
import { profiles } from "./../../providers/api";
import MultiSelectTag from "./../global/MultiSelectTag";
import Spinner from "./../global/Spinner";

class ProfileForm extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: false,
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
		this.handleResetForm = this.handleResetForm.bind(this);
		this.isButtonDisabled = this.isButtonDisabled.bind(this);
	}

	isButtonDisabled() {
		const { profileData } = this.state;
		const { bio, cohort, name } = profileData;

		if (isEqual(profileData, this.props.userProfile)) {
			return true;
		} else if (!bio || !cohort || !name) {
			return true;
		}

		return false;
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
		const { profileData } = this.state;
		this.setState({ isLoading: true });

		const methodVerb = this.props.isNewUser ? "post" : "put";

		profiles[methodVerb](profileData)
			.then(() => {
				this.setState({ isLoading: false });
				this.props.setAuthedUserData(profileData);
			});
	}

	handleResetForm() {
		this.setState({ profileData: this.props.userProfile });
	}

	componentDidUpdate(prevProps) {
		if (isEqual(this.props.userProfile, prevProps.userProfile)) return;

		this.setState({ profileData: this.props.userProfile });
	}

	componentWillMount() {
		this.setState(state => ({ profileData: { ...state.profileData, ...this.props.userProfile }}));
	}

	render() {
		const { isNewUser } = this.props;
		const { isLoading, profileData } = this.state;

		return <div className="w-75 m-auto">
			<h4 className="mb-4">{isNewUser ? "Create" : ""} Your Profile</h4>

			<div className="row">
				<div className="form-group col-sm-12 col-md-8">
					<input
						className="form-control"
						id="name"
						onChange={this.handleOnChange}
						placeholder="Name"
						type="text"
						value={profileData.name}
					/>
				</div>

				<div className="form-group col-sm-12 col-md-4">
					<input
						className="form-control"
						id="cohort"
						onChange={this.handleOnChange}
						placeholder="Cohort"
						type="text"
						value={profileData.cohort}
					/>
				</div>
			</div>

			<div className="form-group">
				<textarea
					className="form-control"
					id="bio"
					onChange={this.handleOnChange}
					placeholder="Tell us about yourself."
					rows="5"
					value={profileData.bio}
				/>
			</div>

			<div className="form-group">
				<MultiSelectTag
					id="tags"
					onChange={this.handleOnChange}
					tags={profileData.tags}
				/>
			</div>

			<div>
				<button
					className="btn btn-primary mr-2"
					disabled={this.isButtonDisabled()}
					onClick={this.handleOnSubmit}
				>
                    Save

					{isLoading && <Spinner
						height="1rem"
						width="1rem"
					/>}
				</button>

				<button
					className="btn btn-danger"
					disabled={this.isButtonDisabled()}
					onClick={this.handleResetForm}
				>
                    Reset
				</button>
			</div>
		</div>;
	}
}

export default ProfileForm;