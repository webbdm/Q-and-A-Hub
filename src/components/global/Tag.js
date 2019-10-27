import React from "react";

import "./Tag.scss";

const Tag = ({onClick, tag}) => {
	return (
		<div className="tag grow px-2 py-1 rounded m-1" onClick={onClick}>
			{tag}
		</div>
	);
};

export default Tag;