import { StackActions, NavigationActions } from 'react-navigation';
import React from 'react';
import { TouchableOpacity, View, AsyncStorage, Image } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Home from './screens/home/Home';
// import Chat from './screens/chat';
import Favourite from './screens/favourite';
import Settings from './screens/settings';
import Profile from './screens/profile';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/Signup/Signup';
import AddProfile from './screens/AddProfile/AddProfile';

import RegisterContinue from './screens/RegisterContinue/RegisterContinue';
import ContinueRegisteration from './screens/ContinueRegisteration/ContinueRegsiteration';
import PaymentOption from './screens/PaymentOption/PaymentOption';
import UserList from './screens/UserList';
import Questions from './screens/Quesions/Questions';
import Loading from './screens/loading';
import MessageList from './screens/MessageList';
import Chat from './components/chat';
import Token from './screens/Token/Token';
import Horoscope from './screens/Horoscope/index';
import Game from './screens/Game/index';
import HoroscopeDetail from './screens/HoroscopeDetail/index';
import SettingOptions from './screens/SettingOptions';
const tabIcons = {
	Home: [require('./../assets/menu_white.png'), require('./../assets/menu_blue.png')],
	Favourite: [require('./../assets/like_white.png'), require('./../assets/like_blue.png')],
	Chat: [require('./../assets/messages_white.png'), require('./../assets/messages_blue.png')],
	Profile: [require('./../assets/profile_white.png'), require('./../assets/profile_blue.png')],
	HoroscopeDetail: [require('./../assets/star_white.png'), require('./../assets/star_blue.png')]
};

export const HomeStack = createStackNavigator(
	{
		Home,
		UserList,
		Profile
	},
	{
		initialRouteName: 'Home'
		// headerMode: "none"
	}
);

export const FavouriteStack = createStackNavigator(
	{
		Favourite,
		Profile
	},
	{
		initialRouteName: 'Favourite',
		headerMode: 'none'
	}
);

export const ChatStack = createStackNavigator(
	{
		Message: Chat,
		MessageList
	},
	{
		initialRouteName: 'MessageList'
	}
);

export const ProfileStack = createStackNavigator(
	{
		Profile,
		AddProfile,
		Settings,
		PaymentOption,
		SettingOptions,
		Game
	},
	{
		initialRouteName: 'Profile',
		headerMode: 'none'
	}
);

export const HoroscopeDetailStack = createStackNavigator(
	{
		HoroscopeDetail,
		Horoscope,
		SettingOptions,
		Token
	},
	{
		initialRouteName: 'HoroscopeDetail'
	}
);



export const AppStack = createBottomTabNavigator(
	{
		Home: HomeStack,
		Favourite: FavouriteStack,
		Chat: ChatStack,
		Profile: ProfileStack,
		HoroscopeDetail: HoroscopeDetailStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				const iconSrc = focused ? tabIcons[routeName][1] : tabIcons[routeName][0];
				return (
					<Image source={iconSrc} style={{ height: 25, width: 30 }} resizeMode="contain" />
				)

			}
		}),
		tabBarOptions: {
			showLabel: false
		},
		initialRouteName: 'Home',
		headerMode: 'none'
	}
);

export const LoginStack = createStackNavigator(
	{
		SignIn: SignIn,
		SignUp: SignUp,
		AddProfile: AddProfile,
		RegisterContinue: RegisterContinue,
		Questions: Questions,
		ContinueRegisteration: ContinueRegisteration,
		Loading: Loading,
	},
	{
		initialRouteName: 'SignIn'
	}
);

export default (swtichNavigator = createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Login: LoginStack
	},
	{
		initialRouteName: 'AuthLoading',
		headerMode: 'none'
	}
));
