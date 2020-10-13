/* eslint-disable no-console */
import React from "react";
import {
	EDIT_ICON,
	ACTIVE_ICON,
	INACTIVE_ICON,
	DELETE_ICON,
	ADMIN_SETTING_ICON,
} from "../../common/images";
import { convertDate } from "../../helpers/useFunction";
import { useHistory } from "react-router-dom";
import categoryAPI from "../../apis/categoryAPI";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions/itemAction";

export default function Item(props) {
	const tags = props.data;
	const history = useHistory();
	const dispatch = useDispatch();

	const handleRoute = (path) => {
		history.push(path);
	};

	const handAddItemStore = () => {
		const handleItem = props.data;
		//action
		const action = addItem(handleItem);
		dispatch(action);
	}

	const handleChangeStatus = async (status) => {
		const tagsTemp = props.data;
		if (status === 1) {
			tagsTemp.status = "active";
		} else {
			tagsTemp.status = "disabled";
		}
		try {
			const params = {
				_id: tagsTemp._id,
				tag: tagsTemp.tag,
				status: tagsTemp.status,
				description: tagsTemp.description,
			};
			await categoryAPI.update(params);
		} catch (err) {
			console.log("Failed to PUT/Update item in API", err);
		}
	};

	return (
		<tr key={tags._id} className="table-head-row">
			<td className="name">{tags.tag}</td>
			<td className="descriptions">{tags.description}</td>
			<td className="match">{tags.__v}</td>
			<td className="create-date">{convertDate(tags.createdAt)}</td>
			<td className="status">
				{tags.status === "active" ? (
					<div title="active">
						<img src={ACTIVE_ICON} alt="active" />
					</div>
				) : (
					<div title="disabled">
						<img src={INACTIVE_ICON} alt="disable" />
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
								onClick={() => handleRoute("/category/edit")}
							>
								<img onClick={() => handAddItemStore()} src={EDIT_ICON} alt="edit" />
							</div>
							<div
								title="Make Active"
								onClick={() => handleChangeStatus(1)}
							>
								<img src={ACTIVE_ICON} alt="active" />
							</div>
							<div
								title="Make deactive"
								onClick={() => handleChangeStatus(0)}
							>
								<img src={INACTIVE_ICON} alt="deactive" />
							</div>
							<div title="Delete">
								<img src={DELETE_ICON} alt="delete" />
							</div>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
}
