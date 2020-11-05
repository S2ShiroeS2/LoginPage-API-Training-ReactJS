/* eslint-disable no-console */
import React from "react";
import {
	EDIT_ICON,
	ACTIVE_ICON,
	INACTIVE_ICON,
	DELETE_ICON,
	ADMIN_SETTING_ICON,
	AVATAR,
} from "../../common/images";
import { convertDate } from "../../helpers/useFunction";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../actions/adminAction";
import adminAPI from "../../apis/adminAPI";

export default function Admin(props) {
	const admins = props.data;
	const history = useHistory();
	const dispatch = useDispatch();

	const handleRoute = (path) => {
		history.push(path);
	};

	const handAddItemStore = () => {
		const handleAdmin = props.data;
		//action
		const action = addAdmin(handleAdmin);
		dispatch(action);
	};

	const handleChangeStatus = async (status) => {
		const adminsTemp = props.data;
		console.log(adminsTemp);
		if (status === "active") {
			adminsTemp.status = "active";
		} else if (status === "inactive") {
			adminsTemp.status = "inactive";
		} else {
			adminsTemp.status = "delete";
		}
		try {
			const params = {
				_id: adminsTemp._id,
				firstName: adminsTemp.firstName,
				lastName: adminsTemp.lastName,
				role: adminsTemp.role,
				status: adminsTemp.status,
			};
			await adminAPI.update(params);
		} catch (err) {
			console.log("Failed to PUT/Update status of Admin in API", err);
		}
	};

	return (
		<tr key={admins._id} className="table-head-row">
			<td className="avatar">
				{admins.avatar === "" ? (
					<img src={AVATAR} alt="avatar" />
				) : (
					<img src={admins.avatar} alt="avatar" />
				)}
			</td>
			<td className="name">{admins.firstName + " " + admins.lastName}</td>
			<td className="email">{admins.username}</td>
			<td className="role">{admins.role}</td>
			<td className="login-time">{convertDate(admins.loginTime)}</td>
			<td className="status">
				{admins.status === "active" ? (
					<div title="active">
						<img src={ACTIVE_ICON} alt="active" />
					</div>
				) : admins.status === "inactive" ? (
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
								title="Edit"
								onClick={() => handleRoute("/admin/edit")}
							>
								<img
									onClick={() => handAddItemStore()}
									src={EDIT_ICON}
									alt="edit"
								/>
							</div>
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
