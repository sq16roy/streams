import {
	FETCHING
} from '../actions/types';

const INITIAL_STATE = {
	loading: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCHING:
			console.log('im here reducer', action.payload);
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};