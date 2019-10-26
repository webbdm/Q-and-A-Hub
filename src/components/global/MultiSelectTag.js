import React, { Component } from "react";
// import { isEqual } from "lodash";
import tags from "./tags";
import Select from "react-select";


class MultiSelectTag extends Component {
	constructor() {
		super();

		this.state = {
			selectedOptions: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selectedOptions) {
		this.props.onChange({
			target: {
				id: this.props.id,
				value: selectedOptions
			}
		});
	}

	// componentDidUpdate(prevProps) {
	// 	if (isEqual(this.props.tags, prevProps.tags)) return;

	// 	const formattedTags = this.props.tags.reduce((accumulator, tagValue) => {
	// 		const tag = tags.find(({ value }) => value === tagValue);
	// 		return tag ? [ ...accumulator, tag ] : accumulator;
	// 	}, []);
	// 	console.log(formattedTags);
	// 	this.handleChange(formattedTags);
	// }

	render() {
		return <Select
			isMulti={true}
			onChange={this.handleChange}
			options={tags}
			value={this.props.tags}
		/>;
	}
}

export default MultiSelectTag;