import React from "react";

import "./ProfileCard.scss";

const ProfileCard = ({
	bio,
	cohort,
	handleAddTagFilter,
	name,
	tags
}) => (
	<div className="border border-dark rounded p-4 mb-4">
		<div className="d-flex align-items-end mb-4">
			<h4 className="m-0 mr-2">{name}</h4>

			<small>{cohort}</small>
		</div>

		<p className="m-0 mb-4">{bio}</p>

		<div className="d-flex flex-wrap">
			{tags.map(tag => <span
				className="tag-badge badge badge-pill badge-secondary mr-2"
				key={`${tag}-${name}`}
				onClick={() => handleAddTagFilter(tag)}
			>
				{tag}
			</span>)}
		</div>
	</div>
);

export default ProfileCard;