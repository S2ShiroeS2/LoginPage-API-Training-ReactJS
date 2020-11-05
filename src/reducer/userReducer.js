/* eslint-disable default-case */
const initialState = {
	listUser: [],
	active: null,
}
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_USER": {
			const newListUser = [...state.listAdmin];
			newListUser.push(action.payload);
			return {
				...state,
				listAdmin: newListUser,
			};
		}
		case "SET_USER": {
			return state;
		}
		default: 
			return state;
	}
};

export default userReducer;
