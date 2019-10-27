import React from "react";

const Spinner = ({
	height,
	width
}) => {
	return <div
		className="spinner-border ml-2"
		style={{ height, width, borderWidth: "1px" }}
	></div>;
};

export default Spinner;