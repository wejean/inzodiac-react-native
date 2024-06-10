import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const primary_color = 'rgb(59, 43, 156)';

const UserCard = ({
	iconName = '',
	name = '',
	age = '',
	location = '',
	count = 0,
	myOwn = false,
	index,
	navigateToUserProfile
}) => (
		<TouchableOpacity
			style={{
				width: '46%',
				marginLeft: "2.5%",
				backgroundColor: 'white',
				height: Dimensions.get('window').width*0.6,
				maxHeight: 300,
				minHeight: 200,
				marginBottom: 10,
				borderRadius: 10,
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				elevation: 2
			}}
			onPress={() => {
				navigateToUserProfile(index);
			}}
		>
			{iconName ? (
				<Image
					source={iconName}
					resizeMode="stretch"
					style={{ height: '65%', width: '100%', borderRadius: 10, borderRadius: 10 }}
				/>
			) : null}
			{!myOwn ? (
				<View style={{ marginLeft: 10, marginTop: 5, paddingVertical: 10, alignSelf: 'center', alignItems: 'center' }}>
					{name ? (
						<Text style={{ fontSize: 14, fontFamily: 'SFUIDisplay-Bold', }}>{`${name}, ${age}`}</Text>
					) : null}
					{location ?
						<Text
							style={{ fontFamily: 'SFUIDisplay-Regular' }}
						>{`${location}`}</Text>
						: null}
				</View>
			) : null}
			{!myOwn ? (
				<View style={{ position: 'absolute', height: '100%', width: '100%', alignItems: 'flex-end', padding: 10 }}>
					<View
						style={{
							backgroundColor: 'rgba(0,0,0,0.5)',
							width: 45,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							borderRadius: 5,
							paddingTop: 3,
							paddingBottom: 3
						}}
					>
						<Image
							source={{ uri: 'camera' }}
							style={{ height: 15, width: 15, opacity: 1 }}
							resizeMode="contain"
						/>
						<Text style={{ fontSize: 10, color: 'white', fontFamily: 'SFUIDisplay-Regular' }}>{count}</Text>
					</View>
				</View>
			) : (
					<View style={{ position: 'absolute', height: '100%', width: '100%' }}>
						<View
							style={{
								backgroundColor: 'rgba(128,128,128,0.6)',
								width: '100%',
								height: '60%',
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
								justifyContent: 'space-evenly',
								alignItems: 'center'
							}}
						>
							<Image
								source={{ uri: 'crown' }}
								style={{ height: 50, width: 50, opacity: 1, zIndex: 10 }}
								resizeMode="contain"
							/>
						</View>
					<View style={{ width: '100%', height: '40%', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: primary_color }}>
						<View style={{ width: '90%' }}>
							<Text
								style={{
									color: '#fff',
									textAlign: 'center',
									fontSize: 18,
									fontWeight: 'bold',
									fontFamily: 'SFUIDisplay-Bold'
								}}
							>
								First in Search
							</Text>
							<Text
								style={{
									color: '#fff',
									textAlign: 'center',
									fontSize: 12,
									fontFamily: 'SFUIDisplay-Regular'
								}}
							>
								Be Shown First to 110,992 people for 24 hours!
							</Text>

							{/* <Button
								title={'Activate'}
								style={{ width: '80%', height: '60%', backgroundColor: 'black', padding: 0 }}
								styleTitle={{ color: 'white' }}
							/> */}
						</View>
						</View>
					</View>
				)}
		</TouchableOpacity>
	);

export default UserCard;
