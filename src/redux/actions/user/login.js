import { callApi } from '../../../api';

export const LOGIN = 'LOGIN';

export const LOGIN_SUCCESS = 'LOGIN_SUCESS';

export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT = 'LOGOUT';

export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const login = ({ email, password }) => {
	return (dispatch) => {
		console.log('the email and password is', email, password);
		dispatch({ type: LOGIN, paload: {} });
		return callApi('post', 'auth/login', { email, password })
			.then((result) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: { access_token: result.data.data.access_token, email: email }
				});
			})
			.catch((error) => {
				dispatch({ type: LOGIN_FAIL, payload: { email: error.response.data.message } });
			});
	};
};
export const signOut = (access_token) => {
	return (dispatch) => {
		dispatch({ type: LOGOUT, paload: {} });
		return callApi(
			'get',
			'auth/logout',
			{},
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token.access_token}`
			}
		)
			.then((result) => {
				dispatch({
					type: LOGOUT_SUCCESS,
					payload: {}
				});
				dispatch({
					type: 'RESET_USER',
					payload: {}
				});
				dispatch({
					type: 'RESET_MATCHES',
					payload: {}
				});
				dispatch({
					type: 'RESET_FAVOURITE',
					payload: {}
				});
				dispatch({
					type: 'RESET_MESSAGE',
					payload: {}
				});
			})
			.catch((error) => {
				dispatch({ type: LOGOUT_FAIL, payload: { email: error.response.data.message } });
			});
	};
};
export const loginSuccess = { type: 'LOGIN_SUCCESS' };

export const loginFailure = { type: 'LOGIN_FAIL' };

export const logout = { type: 'LOGOUT' };

export const forgotPassword = (payload) => ({ type: 'FORGOT_PASSWORD', payload });
