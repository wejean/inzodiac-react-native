import {
	FAVOURITE_SUCCESS,
	FAVOURITE_FAIL,
	FAVOURITE,
	ADD_FAVOURITE_FAIL,
	ADD_FAVOURITE,
	ADD_FAVOURITE_SUCCESS,
	REMOVE_FAVOURITE,
	REMOVE_FAVOURITE_SUCCESS,
	REMOVE_FAVOURITE_FAIL,
	RESET_FAVOURITE
} from '../../actions/favourite';

const initialState = {
	favourites: [],
	err: {},
	loading: false
};
export const favourite = (state = initialState, action) => {
	switch (action.type) {
		case FAVOURITE:
		case ADD_FAVOURITE:
		case REMOVE_FAVOURITE:
			return Object.assign({}, state, { loading: true });
		case RESET_FAVOURITE:
			return initialState;
		case FAVOURITE_SUCCESS:
			return Object.assign({}, state, {
				favourites: action.payload.favourites,
				total: action.payload.total,
				loading: false
			});
		case FAVOURITE_FAIL:
		case ADD_FAVOURITE_FAIL:
		case REMOVE_FAVOURITE_FAIL:
			return Object.assign({}, state, {
				err: action.payload,
				loading: false
			});
		case ADD_FAVOURITE_SUCCESS:
		case REMOVE_FAVOURITE_SUCCESS:
			return Object.assign({}, state, {
				loading: false
			});
		default:
			return state;
	}
};
