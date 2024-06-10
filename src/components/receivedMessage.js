import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import style from '../../style';
import config from '../config';
export default (ReceivedMessage = (props) => {
	return (
		<View
			style={{
				width: '100%',
				alignItems: 'flex-start'
			}}
		>
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					// marginLeft: 15,
					justifyContent: 'space-evenly',
					alignItems: 'center'
				}}
			>
				{!props.hideImage && props.fbProfileImage || props.image ? (
					<Image
						source={{
							uri: props.fbProfileImage
								? `${props.fbProfileImage}`
								: `${config.serverURL}/user/file/${props.image}`,
							cache: 'force-cache'
						}}
						style={{
							height: 44,
							width: 44,
							borderRadius: 22
						}}
					/>
				) : (
						<View
							style={{
								height: 44,
								width: 44,
								borderRadius: 22,
								backgroundColor: 'grey'
							}}
						/>
					)}
				<View
					style={{
						// width: '75%',
						// paddingTop: 10,
						// justifyContent: 'flex-start',
						// alignItems: 'flex-start'
						alignSelf: 'flex-end',
						flexDirection: 'column'
					}}
				>
					<View style={[style.chatContainerStyle, { backgroundColor: '#17366d', color: 'white' }]}>
						<Text style={style.replyChatTextStyle} selectable={true}>
							{props.text}
						</Text>
					</View>
					<Text style={style.chatTimeStyle2}>{props.date}</Text>
				</View>
			</View>
		</View>
	);
});
