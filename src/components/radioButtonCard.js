import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default class RadioButtonCard extends Component {
	render() {
		return (
			<View
				style={{
					flex: 1
				}}
			>
				{this.props.radio_props.map((item) => {
					return (
						<TouchableOpacity onPress={() => {
							this.props.onChoosePlan(item.label);
						}} activeOpacity={0.8} style={{ flexDirection: 'row', height: 100, width: '90%', backgroundColor: '#FFF', elevation: 2, alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}>
							<View style={{ padding: 15, height: '100%', backgroundColor: this.props.selectedOption === item.label ? primary_color : '#ddd', width: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
								<Text style={{ fontSize: 22, fontFamily: 'SFUIDisplay-Bold', color: '#FFF' }}><Text style={{ fontSize: 18 }}>$</Text>{item.amount}</Text>
								<Text style={{ color: '#FFF', fontSize: 16, fontFamily: 'SFUIDisplay-Bold' }}>per week</Text>
							</View>
							<View style={{ paddingHorizontal: 10, height: '100%', width: '70%', alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
								<Text style={{ fontSize: 22, fontFamily: 'SFUIDisplay-Bold', color: this.props.selectedOption === item.label ?  '#000' : '#ddd' }}>
									{item.label}
								</Text>
								<Text style={{ fontSize: 16, fontFamily: 'SFUIDisplay-Bold', color: this.props.selectedOption === item.label ? '#000' : '#ddd' }}>
									Payment of ${item.payment}
								</Text>
								{item.popular ?
								// <View style={{ position: 'absolute', height: '100%', right: 0, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'red'}}>
								<Image style={{ width: 100, height: 100, position: 'absolute', top: -20, right: -20, resizeMode: 'contain' }} source={require('../../assets/most_popular.png')} />
								// {/* <View style={{height: '100%', width: '50%', backgroundColor: 'green', position: 'absolute', right: 20, top: 10, transform: [{rotate: "135deg"}]}}/> */}
								// </View> 
								: null}


							</View>

						</TouchableOpacity>
						// <View
						// 	style={{
						// 		borderBottomColor: '#ababab',
						// 		borderBottomWidth: 1,
						// 		flexDirection: 'row',
						// 		alignItems: 'center',
						// 		flex: 1,
						// 		paddingLeft: 10,

						// 		padding: 10
						// 	}}
						// >
						// 	<TouchableOpacity
						// 		style={{
						// 			width: 20,
						// 			height: 20,
						// 			borderRadius: 10,
						// 			borderColor: '#17366d',
						// 			borderWidth: 1,
						// 			alignItems: 'center',
						// 			justifyContent: 'center'
						// 		}}
						// 		onPress={() => {
						// 			this.props.onChoosePlan(item.label);
						// 		}}
						// 	>
						// 		{this.props.selectedOption === item.label && (
						// 			<View
						// 				style={{
						// 					width: 10,
						// 					height: 10,
						// 					borderRadius: 5,
						// 					backgroundColor: '#17366d'
						// 				}}
						// 			/>
						// 		)}
						// 	</TouchableOpacity>
						// 	<View style={{ flex: 3, paddingLeft: 20 }}>
						// 		<Text style={local_styles.timeText}>{item.label}</Text>
						// 		<Text style={local_styles.priceText}>Payment of ${item.payment}</Text>
						// 		{item.popular ? <Text style={local_styles.popularText}>{'Most Popular'}</Text> : null}
						// 	</View>
						// 	<View style={{ flex: 1, alignItems: 'center' }}>
						// 		<Text style={local_styles.priceText}>${item.amount}</Text>
						// 		<Text style={local_styles.popularText}>{'Per Week'}</Text>
						// 	</View>
						// </View>
					);
				})}
			</View>
		);
	}
}

const primary_color = 'rgb(30, 20, 96)';

const local_styles = StyleSheet.create({
	popularText: {
		fontSize: 12,
		color: '#17366d',
		fontFamily: 'SFUIDisplay-Regular'
	},
	priceText: {
		fontSize: 12,
		color: 'black',
		fontFamily: 'SFUIDisplay-Regular'
	},
	timeText: {
		fontSize: 16,
		color: 'black',
		fontFamily: 'SFUIDisplay-Regular'
	}
});
