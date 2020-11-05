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
	AdminList,
	EditAdminInfo,
	InsertAdmin,
	UserList,
	InsertUser,
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
			/>
			<RouteWrapper
				exact
				path="/admin"
				component={AdminList}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/admin/edit"
				component={EditAdminInfo}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/admin/insert"
				component={InsertAdmin}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/user"
				component={UserList}
				layout={Dashboard}
			/>
			<RouteWrapper
				exact
				path="/user/insert"
				component={InsertUser}
				layout={Dashboard}
			/>
		</BrowserRouter>
	);
}
