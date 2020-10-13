/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import { USER_TOKEN } from "../../constants/appConstants";

const Dashboard = (props) => {
	const history = useHistory();
	const [token, setToken] = useState([]);
	const logOut = () => {
		localStorage.clear();
		history.push("/login");
	};

	const handleRoute = (path) => {
		history.push(path);
	};

	useEffect(() => {
		setToken(localStorage.getItem(USER_TOKEN));
	}, []);

	if (token) {
		return (
			<div>
				<div className="left">
					<div className="slidebar">
						<div className="header">ADMINISTRATOR</div>
						<div className="main-slidebar">
							<a>
								<div className="btn-menu">
									<div
										className="btn"
										onClick={() => handleRoute("/")}
									>
										<i className="fa fa-dashboard"></i>
										<p>Dashboard</p>
									</div>
								</div>
							</a>
							<a>
								<div className="btn-menu">
									<div
										className="btn"
										onClick={() => handleRoute("/profile")}
									>
										<i className="fa fa-user-circle"></i>
										<p>Profile</p>
									</div>
								</div>
							</a>
							<div className="btn-menu">
								<div className="btn">
									<i className="fa fa-user"></i>
									<p>User</p>
									<div className="dropdown-icon">
										<i
											className="fa fa-chevron-down"
											aria-hidden="true"
										></i>
									</div>
								</div>
								<div className="dropdown-content hide">
									<a href="#/">
										<div className="dropdown-item">
											<i
												className="fa fa-user"
												aria-hidden="true"
											></i>
											<p>Admin</p>
										</div>
									</a>
									<a href="#/">
										<div className="dropdown-item">
											<i
												className="fa fa-user"
												aria-hidden="true"
											></i>
											<p>User</p>
										</div>
									</a>
								</div>
							</div>
							<a>
								<div className="btn-menu">
									<div
										className="btn"
										onClick={() => handleRoute("/category")}
									>
										<i
											className="fa fa-tags"
											aria-hidden="true"
										></i>
										<p>Category</p>
									</div>
								</div>
							</a>
							<a>
								<div className="btn-menu">
									<div className="btn">
										<i
											className="fa fa-font"
											aria-hidden="true"
										></i>
										<p>Keyword</p>
									</div>
								</div>
							</a>
							<a>
								<div className="btn-menu">
									<div className="btn">
										<i
											className="fa fa-newspaper-o"
											aria-hidden="true"
										></i>
										<p>New</p>
									</div>
								</div>
							</a>
							<a href="#/">
								<div className="btn-menu">
									<div className="btn">
										<i
											className="fa fa-address-card-o"
											aria-hidden="true"
										></i>
										<p>User Contact</p>
									</div>
								</div>
							</a>
							<a href="#/">
								<div className="btn-menu">
									<div className="btn">
										<i
											className="fa fa-sign-out"
											aria-hidden="true"
										></i>
										<p>Log out</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="header">
						<div className="header-left">
							<i className="fa fa-bars"></i>
							Main Admin
						</div>
						<div className="header-right">
							<button className="" onClick={logOut}>
								<i
									className="fa fa-sign-out"
									aria-hidden="true"
								></i>
								Log out
							</button>
						</div>
						<div className="clear"></div>
					</div>
					<div className="protected-router">
						<div className="page">{props.children}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return history.push("/login");
	}
};

export default Dashboard;
