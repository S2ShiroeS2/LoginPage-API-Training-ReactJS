/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import adminAPI from "../../../apis/adminAPI";

export default function EditAdminInfo() {
	const history = useHistory();
	const admin = useSelector((state) => state.admin.listAdmin);
	const [dataForm, setDataForm] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		status: "",
		role: "",
	});

	useEffect(() => {
		admin.map((admin) => {
			setDataForm({
				...dataForm,
				_id: admin._id,
				firstName: admin.firstName,
				lastName: admin.lastName,
				status: admin.status,
				role: admin.role,
			})
		})
	}, []);

	const handleRoute = (path) => {
		history.push(path);
	};

	const handleChange = (e) => {
		setDataForm({
			...dataForm,
			[e.target.name]: e.target.value,
        });
	};

	const updateInfo = async () => {
		try {
				const params = {
					_id: dataForm._id,
					firstName: dataForm.firstName,
					lastName: dataForm.lastName,
					status: dataForm.status,
					role: dataForm.role,
				};
				await adminAPI.update(params);
		} catch (err) {
			console.log("Failed to edit info admin in API", err);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		updateInfo();
		handleRoute("/admin");
	};
	return (
		<div className="category-add">
			<div className="add-header">
				<h1>Edit Admin</h1>
				<a>
					<button onClick={() => handleRoute("/admin")}>
						BACK TO LISTING
					</button>
				</a>
			</div>
			<div className="add-form">
				<form onSubmit={handleSubmit}>
					<label>First Name:</label>
					<input
						type="text"
						name="firstName"
						value={dataForm.firstName}
						placeholder="First Name"
						onChange={handleChange}
					/>
					<label>Last Name:</label>
					<input
						type="text"
						name="lastName"
						value={dataForm.lastName}
						placeholder="Last Name"
						onChange={handleChange}
					/>
					<label>Status:</label>
					<select
						name="status"
						value={dataForm.status}
						onChange={handleChange}
					>
						<option value="active">active</option>
						<option value="inactive">inactive</option>
						<option value="delete">delete</option>		
					</select>
					<label>Role:</label>
					<select
						name="role"
						value={dataForm.role}
						onChange={handleChange}
					>
						<option value="admin">admin</option>
						<option value="manager">manager</option>
					</select>
					<div className="button">
						<button type="submit">Edit Admin</button>
						<button>Reset</button>
						<button onClick={() => handleRoute("/admin")}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
