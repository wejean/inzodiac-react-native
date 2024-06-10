import { startCase } from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './button';
export default class SingleSelectButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View style={{ flex: 1, padding: 10, width: '100%' }}>
				{this.props.title ? <Text style={localStyles.title}>{this.props.title}</Text> : null}
				<View style={[{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }, this.props.style]}>
					{this.props.options &&
						this.props.options.map((op, key) => {
							return (
								<Button
									key={key}
									onPress={() => {
										this.props.onChange(op);
									}}
									title={startCase(op)}
									styleTitle={{ color: this.props.selected == op ? 'white' : '#9f9f9f' }}
									style={[
										localStyles.btn,
										{
											width: '28%',
											margin: 7,
											borderColor: '#efefef',
											borderWidth: 1,
											backgroundColor: this.props.selected == op ? primary_color : '#fff'
										},
										this.props.buttonStyle
									]}
								/>
							);
						})}
				</View>
			</View>
		);
	}
}

const primary_color = 'rgb(59, 43, 156)';

const localStyles = StyleSheet.create({
	btn: {
		fontSize: 18
	},
	title: {
		marginLeft: 7,
		fontSize: 14,
		color: '#222124',
		marginBottom: 7,
		fontFamily: 'SFUIDisplay-Bold'
	}
});
