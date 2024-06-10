import React, { Component } from 'react';
import debounce from 'lodash/debounce';

const onChangeText = function (value) {
	this.setState({ search: value });
	this.getFavourites(this.props.access_token, value)
};

const getFavourites = function (access_token, name) {
	this.props.getFavourites({ access_token, name });
}

export default class FavouriteBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
		this.onChangeText = onChangeText.bind(this)
		this.getFavourites = debounce(getFavourites.bind(this), 500)
	}
	componentDidMount() {
		this.props.getFavourites({ access_token: this.props.access_token, name: this.state.search });
	}
	componentDidUpdate(prevProps, prevState) { }
}
