/* eslint-disable default-case */
const initialState = {
	listItem: [],
	active: null,
}
const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_ITEM": {
			const newListItem = [...state.listItem];
			newListItem.push(action.payload);
			return {
				...state,
				listItem: newListItem,
			};
		}
		case "SET_ITEM": {
			return state;
		}
		default: 
			return state;
	}
};

export default itemReducer;
