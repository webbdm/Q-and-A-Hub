import React, { Component } from "react";
import tags from "./tags";
import Select from "react-select";


class MultiSelectTag extends Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selectedOptions ) {
		this.props.onChange({
			target: {
				id: this.props.id,
				value: selectedOptions ? selectedOptions.map(({ value }) => value) : []
			}
		});
	}

	render() {
		const formattedTags = this.props.tags.reduce((accumulator, tagValue) => {
			const tag = tags.find(({ value }) => value === tagValue);
			return tag ? [ ...accumulator, tag ] : accumulator;
		}, []);

		return <Select
			className={this.props.className || ""}
			isMulti={true}
			onChange={this.handleChange}
			options={tags}
			placeholder="Select tags..."
			value={formattedTags}
		/>;
	}
}

export default MultiSelectTag;