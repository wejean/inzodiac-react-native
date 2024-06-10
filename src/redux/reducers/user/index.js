import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	LOGIN,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	CLEAR_ERROR,
	CLEAR_ERROR_PROFILE,
	GO_TO_ADD_PROFILE,
	SAVE_TOKEN,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_INSERT,
	PROFILE_INSERT_FAIL,
	PROFILE_ContinueRegisteration_SUCCESS,
	PROFILE_INSERT_SUCCESS2,
	PROFILE_UPDATE,
	PROFILE_UPDATE_FAIL,
	PROFILE_INSERT_SUCCESS,
	CLEAR_PROFILE,
	AVATAR,
	REGISTER,
	AVATAR_FAIL,
	AVATAR_SUCCESS,
	UPLOAD_IMAGE_FAIL,
	UPLOAD_IMAGE_SUCCESS,
	UPLOAD_IMAGE,
	RESET_USER
} from '../../actions/user';

const initialState = {
	name: '',
	email: '',
	birthday: '',
	gender: '',
	fcm_token: '',
	access_token: null,
	register_token: null,
	loading: false,
	err: {},
	ethnicity: '',
	body_type: '',
	preferred_horoscope_type: '',
	eyes_color: '',
	hair_style: '',
	photos: [],
	drink: 0,
	smoke: 0,
	children: 0,
	preferred_language: '',
	heigth: null,
	goToAddProfile: false,
	goToQuestions: false,
	goToHome: false,
	goToProfile: false,
	avatar: null
};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case RESET_USER:
			return initialState;
		case LOGIN:
		case LOGOUT:
		case REGISTER:
		case AVATAR:
		case UPLOAD_IMAGE:
		case PROFILE_UPDATE:
			return Object.assign({}, state, { loading: true });
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				email: action.payload.email,
				access_token: action.payload.access_token,
				loading: false
			});
		case SAVE_TOKEN:
			return Object.assign({}, state, {
				register_token: action.payload.access_token
			});
		case LOGIN_FAIL:
		case LOGOUT_FAIL:
			return Object.assign({}, state, {
				err: action.payload,
				loading: false
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, initialState);
		case PROFILE_INSERT_SUCCESS2:
			return Object.assign({}, state, {
				...action.payload,
				aboutMe2: true, 
				loading: false,
				err: {}
			}); 
		case REGISTER_SUCCESS:
			return Object.assign({}, state, {
				...action.payload,
				loading: false,
				goToContinueRegisteration: true,
				aboutMe: false,
				err: {}
			});
		case REGISTER_FAIL:
			return Object.assign({}, state, {
				err: action.payload.error,
				loading: false
			});
		case PROFILE_UPDATE_FAIL:
			return Object.assign({}, state, {
				err: action.payload.error,
				loading: false
			});
		case CLEAR_ERROR:
			const { errorType } = action.payload;
			return Object.assign({}, state, {
				err: { ...state.err, [errorType]: null }
			});
		case CLEAR_ERROR_PROFILE:
			const { errorType1 } = action.payload;
			return Object.assign({}, state, {
				err: { ...state.err, [errorType1]: null }
			});
		case GO_TO_ADD_PROFILE:
			return Object.assign({}, state, {
				goToAddProfile: true
			});
		case PROFILE_INSERT:
			return Object.assign({}, state, {
				loading: true
			});
		case PROFILE_INSERT_SUCCESS:
			return Object.assign({}, state, {
				...action.payload,
				loading: false,
				goToHome: true,
				aboutMe: true
			});
		case PROFILE_ContinueRegisteration_SUCCESS: 
			return Object.assign({}, state, {
				...action.payload,
				loading: false,
				goToAddProfile: true
			});
		case PROFILE_INSERT_FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		case PROFILE_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				...action.payload,
				loading: false,
				goToProfile: true
			});
		case CLEAR_PROFILE:
			return Object.assign({}, state, {
				goToProfile: false
			});
		case AVATAR_SUCCESS:
			return Object.assign({}, state, {
				avatar: action.payload,
				loading: false
			});
		case AVATAR_FAIL:
		case UPLOAD_IMAGE_FAIL:
			return Object.assign({}, state, {
				err: action.payload,
				loading: false
			});
		case UPLOAD_IMAGE_SUCCESS:
			return Object.assign({}, state, {
				photos: [...state.photos, action.payload],
				loading: false
			});

		default:
			return state;
	}
};
