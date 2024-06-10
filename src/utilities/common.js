import React from 'react';
import { Dimensions, AsyncStorage, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window');
export function isIphoneX() {
	let modelName = DeviceInfo.getModel()
	return modelName === 'iPhone X' || modelName === 'iPhone' || modelName === 'iPhone 11';
}
export function isIphoneSE() {
	return DeviceInfo.getModel() === 'iPhone SE';
}
export function isIos() {
	return Platform.OS === 'ios';
}
let headerHeight = isIphoneX() ? 145 : 94;

export { height, width, headerHeight };
