/* eslint-disable no-console */
import React from "react";
import {
	ACTIVE_ICON,
	INACTIVE_ICON,
	DELETE_ICON,
	ADMIN_SETTING_ICON,
	AVATAR,
} from "../../common/images";
import { convertDate } from "../../helpers/useFunction";
import userAPI from "../../apis/userAPI";

export default function User(props) {
	const users = props.data;

	const handleChangeStatus = async (status) => {
		const usersTemp = props.data;
		console.log(usersTemp);
		if (status === "active") {
			usersTemp.status = "active";
		} else if (status === "inactive") {
			usersTemp.status = "inactive";
		} else {
			usersTemp.status = "delete";
		}
		try {
			const params = {
				_id: usersTemp._id,
				firstName: usersTemp.firstName,
				lastName: usersTemp.lastName,
				status: usersTemp.status,
				dob: usersTemp.dob,
				gender: usersTemp.gender,
				companyId: usersTemp.companyId,
			};
			await userAPI.update(params);
		} catch (err) {
			console.log("Failed to PUT/Update status of user in API", err);
		}
	};

	return (
		<tr key={users._id} className="table-head-row">
			<td className="avatar">
				{users.avatar === "" ? (
					<img src={AVATAR} alt="avatar" />
				) : (
					<img src={users.avatar} alt="avatar" />
				)}
			</td>
			<td className="name">{users.firstName}</td>
			<td className="username">{users.username}</td>
			<td className="gender">{users.gender}</td>
			<td className="register-from">{users.from}</td>
			<td className="create-date">{convertDate(users.createdAt)}</td>
			<td className="status">
				{users.status === "active" ? (
					<div title="active">
						<img src={ACTIVE_ICON} alt="active" />
					</div>
				) : users.status === "inactive" ? (
					<div title="inactive">
						<img src={INACTIVE_ICON} alt="inactive" />
					</div>
				) : (
					<div title="inactive">
						<img src={DELETE_ICON} alt="delete" />
					</div>
				)}
			</td>
			<td className="action">
				<div className="option" tabIndex="0" onClick={props.onPress}>
					<img src={ADMIN_SETTING_ICON} alt="setting" />
					{props.showOption && (
						<div className="more-option">
							<div
								title="Make Active"
								onClick={() => handleChangeStatus("active")}
							>
								<img src={ACTIVE_ICON} alt="active" />
							</div>
							<div
								title="Make inactive"
								onClick={() => handleChangeStatus("inactive")}
							>
								<img src={INACTIVE_ICON} alt="inactive" />
							</div>
							<div
								title="Delete"
								onClick={() => handleChangeStatus("delete")}
							>
								<img src={DELETE_ICON} alt="delete" />
							</div>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
}
