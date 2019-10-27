import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import tags from "./tags";
import Select from "react-select";

const animatedComponents = makeAnimated();

class MultiSelectTag extends Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(selectedOptions) {
		this.props.onChange({
			target: {
				id: this.props.id,
				value: selectedOptions ? selectedOptions.map(({ value }) => value) : []
			}
		});
	}

	render() {
		const { placeholder } = this.props;

		const formattedTags = this.props.tags.reduce((accumulator, tagValue) => {
			const tag = tags.find(({ value }) => value === tagValue);
			return tag ? [ ...accumulator, tag ] : accumulator;
		}, []);

		return <Select
			className={this.props.className || ""}
			components={animatedComponents}
			isMulti={true}
			onChange={this.handleChange}
			options={tags}
			placeholder={placeholder ? placeholder : "Select tags..."}
			value={formattedTags}
		/>;
	}
}

export default MultiSelectTag;