import {
	MATCHES_SUCCESS,
	MATCHES_FAIL,
	MATCHES,
	GET_FILTER_SUCCESS,
	UPDATE_FILTER_SUCCESS,
	CLEAR_FILTER_SUCCESS,
	MATCHES_SUCCESS_CLEAN,
	RESET_MATCHES,
	MATCHES_LOADING
} from '../../actions/matches';

const initialFilters = {
	"gender": null,
	"from_age": 0,
	"to_age": 0,
	"ethnicity": "",
	"body_type": "",
	"preferred_language": "",
	"hair_style": "",
	"preferred_horoscope_type": "",
	"relation_ship": "",
	"country": "",
	"city": ""
};

const initialState = {
	matches: [],
	err: {},
	filters: initialFilters,
	loading: false,
	refreshing: false
};


export const matches = (state = initialState, action) => {
	switch (action.type) {
		case RESET_MATCHES:
			return initialState
		case MATCHES_LOADING:
			return Object.assign({}, state, { loading: true });
		case MATCHES:
			return Object.assign({}, state, { refreshing: true, loading: true });
		case MATCHES_SUCCESS:
			return Object.assign({}, state, {
				matches: state.matches.concat(action.payload),
				refreshing: false,
				loading: false
			});
		case MATCHES_SUCCESS_CLEAN:
			return Object.assign({}, state, {
				matches: action.payload,
				refreshing: false,
				loading: false
			});
		case MATCHES_FAIL:
			return Object.assign({}, state, {
				err: action.payload,
				refreshing: false,
				loading: false
			});
		case GET_FILTER_SUCCESS:
			return Object.assign({}, state, {
				filters: Object.assign({}, state.filters, {
					...action.payload
				})
			})
		case UPDATE_FILTER_SUCCESS:
			return Object.assign({}, state, {
				filters: Object.assign({}, state.filters, {
					...action.payload
				})
			})
		case CLEAR_FILTER_SUCCESS:
			return Object.assign({}, state, {
				filters: initialFilters
			})
		default:
			return state;
	}
};
