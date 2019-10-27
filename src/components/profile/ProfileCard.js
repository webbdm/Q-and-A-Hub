import React from "react";
import Tag from "./../global/Tag";

import "./ProfileCard.scss";

const ProfileCard = ({
	bio,
	cohort,
	handleAddTagFilter,
	name,
	tags
}) => (
	<div className="profile-card ml-4 mb-5 py-1">
		<div className="d-flex align-items-end mb-4">
			<h4 className="m-0 mr-2">{name}</h4>

			<small>{cohort}</small>
		</div>

		<p className="m-0 mb-4">{bio}</p>

		<div className="d-flex flex-wrap">
			{tags.map(tag => <Tag
				key={`${tag}-${name}`}
				onClick={() => handleAddTagFilter(tag)}
				tag={tag}
			/>
			)}
		</div>
	</div>
);

export default ProfileCard;