import { callApi } from '../../../api';

export const MATCHES = 'MATCHES';

export const MATCHES_SUCCESS = 'MATCHES_SUCCESS';

export const MATCHES_SUCCESS_CLEAN = 'MATCHES_SUCCESS_CLEAN';

export const MATCHES_FAIL = 'MATCHES_FAIL';

export const GET_FILTER_SUCCESS = 'GET_FILTER_SUCCESS';

export const UPDATE_FILTER_SUCCESS = 'UPDATE_FILTER_SUCCESS';

export const CLEAR_FILTER_SUCCESS = 'CLEAR_FILTER_SUCCESS';

export const RESET_MATCHES = 'RESET_MATCHES'

export const MATCHES_LOADING = 'MATCHES_LOADING'

const parseFilters = filters => {
	return filters ? Object.keys(filters).reduce((parsedFilters, filter) => {
		if (filters[filter] || filters[filter] === 0) {
			parsedFilters[filter] = filters[filter]
		}
		return parsedFilters
	}, {}) : {}
}
export const getMatches = ({ type, kind, offset, limit, access_token, filters, clean }) => {
	return async (dispatch) => {
		// dispatch({ type: MATCHES, paload: {} });

		try {
			let filterSettings = { data: { data: { settings: filters } } }
			if (!filters) {
				filterSettings = await callApi(
					'get',
					'user/get_filter_setting',
					{},
					{
						'content-type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer  ${access_token}`
					}
				)
				dispatch({
					type: GET_FILTER_SUCCESS,
					payload: filterSettings.data.data.settings || {}
				});
			}
			const parsedFilters = parseFilters(filterSettings.data.data.settings || {})
			console.log("---parsedFilters---->>>>", parsedFilters)
			const users = await callApi(
				'post',
				'user/find',
				{ type, kind, offset, limit, ...parsedFilters },
				{
					'content-type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer  ${access_token}`
				}
			)
			if (clean) {
				dispatch({
					type: MATCHES_SUCCESS_CLEAN,
					payload: users.data.data.users
				});
			} else {
				dispatch({
					type: MATCHES_SUCCESS,
					payload: users.data.data.users
				});
			}
		} catch (error) {
			dispatch({ type: MATCHES_FAIL, payload: error.response.data.message });
		}
	}
}

export const getFilters = (access_token) => {
	return (dispatch) => {
		return callApi(
			'get',
			'user/get_filter_setting',
			{},
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token}`
			}
		)
			.then((result) => {
				dispatch({
					type: GET_FILTER_SUCCESS,
					payload: result.data.data.settings || {}
				});
			})
			.catch((error) => {
				// dispatch({ type: MATCHES_FAIL, payload: { email: error.response.data.message } });
			});
	};
};

export const updateFilters = (filter, access_token) => {
	return (dispatch) => {
		return callApi('post', 'user/update_filter_setting', filter, {
			'content-type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer  ${access_token}`
		})
			.then((result) => {
				console.log('the update filterresult is---->>>', result.data.data);
				dispatch({
					type: UPDATE_FILTER_SUCCESS,
					payload: filter
				});
			})
			.catch((error) => {
				console.log('--------update filter fails --->>>>>', error);
				// dispatch({ type: MATCHES_FAIL, payload: { email: error.response.data.message } });
			});
	};
};

export const clearFilters = (access_token) => {
	return (dispatch) => {
		return callApi(
			'get',
			'user/reset_filter_setting',
			{},
			{
				'content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer  ${access_token}`
			}
		)
			.then((result) => {
				console.log('the clear filterresult is---->>>', result.data.data);
				dispatch({
					type: CLEAR_FILTER_SUCCESS
				});
			})
			.catch((error) => {
				console.log('--------clear filter fails --->>>>>', error);
				// dispatch({ type: MATCHES_FAIL, payload: { email: error.response.data.message } });
			});
	};
};
