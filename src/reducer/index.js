import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import AdminReducer from "./adminReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
	item: ItemReducer,
	admin: AdminReducer,
	user: UserReducer,
});
export default rootReducer;
