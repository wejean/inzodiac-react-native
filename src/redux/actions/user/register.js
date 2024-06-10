import { callApi } from '../../../api';

export const REGISTER = 'REGISTER';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOADING = 'LOADING';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const GO_TO_ADD_PROFILE = 'GO_TO_ADD_PROFILE';

export const SAVE_TOKEN = 'SAVE_TOKEN';

export const RESET_USER = 'RESET_USER';

export const register = (payload) => (dispatch) => {
	dispatch({
		type: REGISTER,
		payload: {}
	});
	console.log("payload:\t", payload);
	return callApi('post', 'auth/signup', payload)
		.then((result) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: result.data.data
			});
			console.log("result:\t",result);
			return callApi('post', 'auth/login', { email: payload.email, password: payload.password })
				.then((result) => {
					dispatch({ type: SAVE_TOKEN, payload: { access_token: result.data.data.access_token } });
				})
				.catch((error) => { });
		})
		.catch((error) => {
			console.log(error)
			dispatch({ type: REGISTER_FAIL, payload: { error: error } });
		});
};
export const getMe = ({ access_token }) => {
	return (dispatch) => {
		dispatch({ type: REGISTER, paload: {} });
		return callApi(
			'get',
			'auth/me',
			{},
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token}`
			}
		)
			.then((result) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: result.data.data
				});
			})
			.catch((error) => {
				dispatch({ type: REGISTER_FAIL, payload: { email: error.response.data.message } });
			});
	};
};
export const clearError = (errorType) => ({ type: CLEAR_ERROR, payload: { errorType } });
