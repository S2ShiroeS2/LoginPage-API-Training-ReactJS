import React from "react";
import { USER_NAME } from "../../constants/appConstants";
import "./Style-Profile.css";

export default function Profile() {
	const userName = localStorage.getItem(USER_NAME);
	return (
		<div className="profile">
			<div className="profile-header">
				<h1>Profile</h1>
			</div>
			<div className="user-info">
				<div className="user-name">
					<h2>{userName}</h2>
					<button>
						<i className="fa fa-pencil"></i>
					</button>
				</div>
			</div>
			<div className="avatar">
				<div className="image">
					<div className="no-image">
						<i className="fa fa-cloud-upload"></i>
						<p>avatar</p>
					</div>
					<input type="file" accept="image/*" />
				</div>
			</div>
		</div>
	);
}
