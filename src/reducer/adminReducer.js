/* eslint-disable default-case */
const initialState = {
	listAdmin: [],
	active: null,
}
const AdminReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_ADMIN": {
			const newListAdmin = [...state.listAdmin];
			newListAdmin.push(action.payload);
			return {
				...state,
				listAdmin: newListAdmin,
			};
		}
		case "SET_ADMIN": {
			return state;
		}
		default: 
			return state;
	}
};

export default AdminReducer;
