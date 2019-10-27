import React from "react";

import "./Tag.scss";

const Tag = ({onClick, tag}) => {
	return (
		<div className="tag grow px-2 py-1 rounded" onClick={onClick}>
			{tag}
		</div>
	);
};

export default Tag;