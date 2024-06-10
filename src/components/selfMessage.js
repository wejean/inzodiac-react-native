import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../style';

export default (SelfMessage = (props) => {
	return (
		<View
			style={{
				width: '100%',
				flexDirection: 'row',
				paddingLeft: '10%',
				paddingRight: '10%',
				justifyContent: 'space-between',
				alignItems: 'center'
				// paddingRight: 60
			}}
		>
			<Image source={props.profilePhoto} style={{ height: 40, width: 40, borderRadius: 20, opacity: props.showImage ? 1 : 0, marginRight: 20 }} />
			<View
				style={{
					alignSelf: 'flex-start',
					flexDirection: 'column',
					minWidth: '50%',
					alignItems: 'center'
				}}
			>
				<View
					style={[
						styles.chatContainerStyle,
						{
							backgroundColor: props.receiver ? '#17366d' : 'white',
							alignSelf: 'flex-start',
							width: '100%'
						}
					]}
				>
					<Text style={[styles.myChatTextStyle, { color: props.receiver ? 'white' : 'black' }]} selectable={true}>
						{props.text}
					</Text>
				</View>
				<Text style={styles.chatTimeStyle}>{props.date}</Text>
			</View>
		</View >
	);
});
