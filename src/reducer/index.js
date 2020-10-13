import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";

const rootReducer = combineReducers({
	item: ItemReducer,
});
export default rootReducer;
