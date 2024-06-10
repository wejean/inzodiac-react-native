import { callApi } from '../../../api';

export const FAVOURITE = 'FAVOURITE';

export const FAVOURITE_SUCCESS = 'FAVOURITE_SUCCESS';

export const FAVOURITE_FAIL = 'FAVOURITE_FAIL';

export const ADD_FAVOURITE = 'ADD_FAVOURITE';

export const ADD_FAVOURITE_SUCCESS = 'ADD_FAVOURITE_SUCCESS';

export const ADD_FAVOURITE_FAIL = 'ADD_FAVOURITE_FAIL';

export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';

export const REMOVE_FAVOURITE_SUCCESS = 'REMOVE_FAVOURITE_SUCCESS';

export const REMOVE_FAVOURITE_FAIL = 'REMOVE_FAVOURITE_FAIL';

export const RESET_FAVOURITE = "RESET_FAVOURITE"

export const getFavourites = ({ access_token, name }) => {
	return (dispatch) => {
		let data = name.length > 0 ? { name } : {};
		// dispatch({ type: FAVOURITE, paload: {} });
		return callApi('post', 'user/list_favourite', data, {
			'content-type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer  ${access_token}`
		})
			.then((result) => {
				dispatch({
					type: FAVOURITE_SUCCESS,
					payload: { favourites: result.data.data.data, total: result.data.data.total }
				});
			})
			.catch((error) => {
				console.log('there is some error---->>>', error);
				dispatch({ type: FAVOURITE_FAIL, payload: error.response.data.message });
			});
	};
};
export const AddFavourite = ({ access_token, favourite_id }) => {
	return (dispatch) => {
		dispatch({ type: ADD_FAVOURITE, paload: {} });
		return callApi(
			'post',
			'user/add_favourite',
			{ favourite_id },
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token}`
			}
		)
			.then((result) => {
				dispatch(getFavourites({ access_token, name: '' }));
				dispatch({
					type: ADD_FAVOURITE_SUCCESS,
					payload: result.data.data
				});
			})
			.catch((error) => {
				console.log('error is', error);
				dispatch({ type: ADD_FAVOURITE_FAIL, payload: error.response.data });
			});
	};
};
export const removeFavourite = ({ access_token, favourite_id }) => {
	return (dispatch) => {
		dispatch({ type: REMOVE_FAVOURITE, paload: {} });
		return callApi(
			'post',
			'user/remove_favourite',
			{ favourite_id },
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token}`
			}
		)
			.then((result) => {
				console.log('the data is', result.data.data);
				dispatch(getFavourites({ access_token, name: '' }));
				dispatch({
					type: REMOVE_FAVOURITE_SUCCESS,
					payload: result.data.data
				});
			})
			.catch((error) => {
				console.log('error is', error);
				dispatch({ type: REMOVE_FAVOURITE_FAIL, payload: error.response.data });
			});
	};
};
