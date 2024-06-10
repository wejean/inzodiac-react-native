import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';

import HomeBase from './HomeBase';
import CategoryCard from '../../components/CategoryCard';

const blue = '#17366d';

const gray = 'rgb(245,245,245)';

const categories = [
	{
		iconName: 'classic_compatible',
		title: 'Classic Compatible',
		value: 'classic_compatible'
	},
	{
		iconName: 'opposite_attracts',
		title: 'Opposites Attract',
		value: 'opposites_attract'
	},
	{
		iconName: 'more_understanding',
		title: 'More Understanding Required',
		description: 'Chalk & Cheese',
		value: 'chalk_cheese'
	},
	{
		iconName: 'data_potential',
		title: 'Passion Potential',
		value: 'passion_potential'
	},
	{
		iconName: 'wildcard',
		title: 'Wildcard',
		value: 'wildcard'
	},
	{
		iconName: 'our_pick',
		title: 'Our Pick',
		value: 'our_pick'
	}
];
export default class Home extends HomeBase {
	static navigationOptions = ({ navigation }) => ({
		header: () => {
			const isEastern = navigation.getParam('isEastern', true);
			const onTabChange = navigation.getParam('onTabChange', () => {});
			return Header(<View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>				
			<TouchableOpacity
				onPress={() => {
					!isEastern && onTabChange(!isEastern);
				}}
			>
				<View style={{ paddingBotton: 0, justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							marginRight: 15,
							color: '#ffffff',
							fontWeight: '500',
							fontFamily: 'AirbnbCerealApp-Bold',
							fontSize: isEastern ? 26:16
						}}
					>
						Chinese
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					isEastern && onTabChange(!isEastern);
				}}
			>
				<View style={{ paddingBotton: 0, justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							marginLeft: 15,
							color: '#ffffff',
							fontWeight: 'bold',
							fontWeight: '500',
							fontFamily: 'AirbnbCerealApp-Bold',
							fontSize: isEastern ? 16:26
						}}
					>
						Western
					</Text>
				</View>
			</TouchableOpacity>
			</View>);
		}
	});
	render() {
		const { isEastern } = this.state;
		return (
			<View
				style={{
					flex: 1,
					width: '100%',
					backgroundColor: '#FFFFFF',
					flexDirection: 'row',
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					flexWrap: 'wrap'
				}}
			>
				{isEastern ? (
					categories.map((props, index) => (
						<CategoryCard
							key={`category${index}`}
							onPress={() => {
								this.onPressCategory(props.value);
							}}
							{...props}
						/>
					))
				) : (
					categories.map((props, index) => (
						<CategoryCard
							key={`category${index}`}
							onPress={() => {
								this.onPressCategory(props.value);
							}}
							{...props}
						/>
					))
				)}
			</View>
		);
	}
}
