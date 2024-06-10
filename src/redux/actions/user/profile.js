import { callApi } from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_INSERT = 'PROFILE_INSERT';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_INSERT_SUCCESS = 'PROFILE_INSERT_SUCCESS';
export const PROFILE_INSERT_SUCCESS2 = 'PROFILE_INSERT_SUCCESS2';

export const PROFILE_ContinueRegisteration_SUCCESS = 'PROFILE_ContinueRegisteration_SUCCESS';

export const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CLEAR_ERROR_PROFILE = 'CLEAR_ERROR_PROFILE';
export const AVATAR = 'AVATAR';
export const AVATAR_SUCCESS = 'AVATAR_SUCCESS';
export const AVATAR_FAIL = 'AVATAR_FAIL';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
import get from 'lodash/get'

export const insertProfile = (payload, token, about) => (dispatch, getState) => {
	const { user: { access_token } } = getState();
	dispatch({ type: PROFILE_INSERT, payload: {} });
	if (!access_token) {
		dispatch({ type: 'LOGIN_SUCCESS', payload: { access_token: token } });
		AsyncStorage.setItem('userToken', token);
	}
	return callApi('post', 'auth/update_profile', payload, {
		'content-type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer  ${token}`
	})
		.then((result) => {

			if(about)
			{
				console.log(result);
				dispatch({
					type: PROFILE_INSERT_SUCCESS2,
					payload: payload
				});
			}
			dispatch({
				type: PROFILE_INSERT_SUCCESS,
				payload: payload
			});
			
		})
		.catch((error) => {
			alert('error',about)

			dispatch({ type: PROFILE_UPDATE_FAIL, payload: { error: error.response.data } });
		});
};

export const continueRegisteration_insertProfile = (payload, token) => (dispatch, getState) => {
	const { user: { access_token } } = getState();
	dispatch({ type: PROFILE_INSERT, payload: {} });
	if (!access_token) {
		dispatch({ type: 'LOGIN_SUCCESS', payload: { access_token: token } });
		AsyncStorage.setItem('userToken', token);
	}
	return callApi('post', 'auth/update_profile', payload, {
		'content-type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer  ${token}`
	})
		.then((result) => {
			dispatch({
				type: PROFILE_ContinueRegisteration_SUCCESS,
				payload: payload
			});
		})
		.catch((error) => {
			dispatch({ type: PROFILE_UPDATE_FAIL, payload: { error: error.response.data } });
		});
};

export const updateProfile = (payload, token) => (dispatch, getState) => {
	dispatch({ type: PROFILE_UPDATE, payload: {} });
	return callApi('post', 'auth/update_profile', payload, {
		'content-type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer  ${token}`
	})
		.then((result) => {
			dispatch({
				type: PROFILE_UPDATE_SUCCESS,
				payload: payload
			});
			alert("successs")

			console.log("success")

		})
		.catch((error) => {
			dispatch({ type: PROFILE_UPDATE_FAIL, payload: { error: error.response.data } });
		});
};
export const addAvatar = ({ source, access_token }) => (dispatch, getState) => {
	dispatch({ type: AVATAR, payload: {} });
	let data = new FormData();
	data.append('image', source);
	return callApi('post', 'user/upload_avatar', data, {
		'content-type': 'multipart/form-data',
		Accept: 'application/json',
		Authorization: `Bearer ${access_token}`
	})
		.then((result) => {
			console.log(result.data.avatar)
			dispatch({
				type: AVATAR_SUCCESS,
				payload: result.data.avatar
			});
		})
		.catch((error) => {
			console.log('tehre is some error---->>>', error);
			dispatch({ type: AVATAR_FAIL, payload: { error: get(error, 'response.data', {}) } });
		});
};
export const uploadImage = ({ source, access_token }) => (dispatch, getState) => {
	dispatch({ type: UPLOAD_IMAGE, payload: {} });
	let data = new FormData();
	data.append('image', source);
	return callApi('post', 'user/upload_photo', data, {
		'content-type': 'multipart/form-data',
		Accept: 'application/json',
		Authorization: `Bearer ${access_token}`
	})
		.then((result) => {
			dispatch({
				type: UPLOAD_IMAGE_SUCCESS,
				payload: result.data.data.photo
			});
		})
		.catch((error) => {
			console.log('tehre is some error---->>>', error);
			dispatch({ type: UPLOAD_IMAGE_FAIL, payload: { error: get(error, 'response.data', {}) } });
		});
};
export const clearErrorProfile = (errorType) => ({ type: CLEAR_ERROR_PROFILE, payload: { errorType } });
