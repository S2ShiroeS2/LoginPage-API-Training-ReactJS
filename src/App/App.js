import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import {
	Login,
	Dashboard,
	ContentDash,
	Profile,
	Category,
	InsertItem,
	EditItem,
} from "../routes/routes";
import RouteWrapper from "../routes/RouteWrapper";

export default function App() {
	return (
		<BrowserRouter>
			<RouteWrapper
				exact
				path="/login"
				component={Login}
				layout={Login}
			/>
			<RouteWrapper
				exact
				path="/"
				component={ContentDash}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/profile"
				component={Profile}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/category"
				component={Category}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/category/insert"
				component={InsertItem}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/category/edit"
				component={EditItem}
				layout={Dashboard}
				// data={tags}
			/>
		</BrowserRouter>
	);
}
