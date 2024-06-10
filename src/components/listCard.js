import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class ListCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let { onPressItem } = this.props;
		return (
			<TouchableOpacity
				style={[ local_styles.container, this.props.style ]}
				onPress={() => {
					onPressItem(this.props.screenName);
				}}
			>
				<Image resizeMode="contain" style={local_styles.img} source={this.props.iconName} />

				<Text style={local_styles.title}>{this.props.title}</Text>
			</TouchableOpacity>
		);
	}
}
const local_styles = StyleSheet.create({
	container: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		padding: 20,
		backgroundColor: 'white',
	},
	img: {
		height: 25,
		width: 25,
		color: 'red'
	},
	title: {
		color: 'black',
		marginLeft: 30,
		fontSize: 16,
		fontFamily: 'SFUIDisplay-Regular'
	}
});
