import { combineReducers } from 'redux';
import { user } from '../reducers/user';
import { matches } from '../reducers/matches';
import { favourite } from '../reducers/favourite';
import { message } from '../reducers/message';
export const reducer = combineReducers({
	user,
	matches,
	favourite,
	message
});
