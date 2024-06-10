/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import { Image, ImageBackground, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import swtichNavigator from './src/routes.js';
import { initalizeSocket } from './src/socket';



const Navigator = createAppContainer(swtichNavigator);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			continue: true
		};

	}

	componentDidMount() {
		// SplashScreen.hide();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userId !== this.props.userId) {
			this.props.userId && initalizeSocket(this.props.userId, this.props.dispatch)
		}

	}
	render() {
		const primary_color = '#230F64';
		return (
			<Fragment>
				<SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(245,245,245)' }}>
					{
						this.state.continue ?
							<View style={{ flex: 1, backgroundColor: primary_color }}>
							
									<ImageBackground imageStyle={{resizeMode: 'cover'}} style={{ flex: 1, borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }} source={require('./assets/start.png')}>
									<View	style={{ flexDirection: 'row', height: 50, width: '90%', justifyContent: 'space-between', alignSelf: 'center', marginTop: 25}}	>
										<Icon
											name="left"
											color={'white'}
											size={20}
											onPress={() => {
											this.setState({continue: false})
											}}
										/>
										<Text style={{ color: '#FFF', textAlign: 'center', fontSize: 15 }}>SKIP</Text>

									</View>
									
									<Image style={{ height: '15%', width: '100%', borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }} resizeMode={'contain'} source={require('./assets/logo.png')}></Image>
									<View style={{position: 'absolute', width: '100%', bottom: '20%', alignItems: 'center'}}>
									<Text style={{ color: '#FFF', width: '100%', textAlign: 'center', marginBottom: '10%', fontSize: 28 }}>Lets get started!</Text>
									<Text style={{ color: '#FFF', width: '100%', textAlign: 'center', fontSize: 15 }}>We’ll ask you couple of {'\n'}
									questions to get to know you. {'\n'}
									It will take maximum 4 Minutes</Text>
									</View>										
									</ImageBackground>

																
								<TouchableOpacity onPress={() => {this.setState({ continue: false })}}  style={{ width: '100%', height: '10%', justifyContent: 'center' }}>
									<Text style={{ color: '#FFF', alignSelf: 'center' }}>CONTINUE</Text>
								</TouchableOpacity>
							</View>
							:
							<View style={{ flex: 1 }}>
								<StatusBar backgroundColor={'rgb(245,245,245)'} barStyle="dark-content" />
								<Navigator />
							</View>
					}

				</SafeAreaView>
			</Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.user.id
	};
};

export default connect(mapStateToProps)(App);
