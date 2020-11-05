/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import adminAPI from "../../../apis/adminAPI";

export default function insertAdmin() {
	const history = useHistory();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		status: "",
		role: "",
	});

	const handleRoute = (path) => {
		history.push(path);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const insertNewAdmin = async () => {
		try {
			const params = {
				firstName: form.firstName,
				lastName: form.lastName,
				username: form.username,
				password: form.password,
				status: form.status,
				role: form.role,
			};
			await adminAPI.adAdmin(params);
		} catch (err) {
			console.log("Failed to insert admin in API", err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		insertNewAdmin();
		handleRoute("/admin");
	};

	return (
		<div className="category-add">
			<div className="add-header">
				<h1>Add Category</h1>
				<a>
					<button onClick={() => handleRoute("/admin")}>
						BACK TO LISTING
					</button>
				</a>
			</div>
			<div className="add-form">
				<form onSubmit={handleSubmit}>
					<div>
						<label>First Name:</label>
						<input
							type="text"
							name="firstName"
							value={form.firstName}
							placeholder="First Name"
							onChange={handleChange}
						/>
						<label>Last Name:</label>
						<input
							type="text"
							name="lastName"
							value={form.lastName}
							placeholder="Last Name"
							onChange={handleChange}
						/>
						<label>User Name:</label>
						<input
							type="text"
							name="username"
							value={form.username}
							placeholder="User Name"
							onChange={handleChange}
						/>
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={form.password}
							placeholder="Password"
							onChange={handleChange}
						/>
					</div>
					<label>Status:</label>
					<select
						name="status"
						value={form.status}
						onChange={handleChange}
					>
						<option value="status">status</option>
						<option value="active">active</option>
						<option value="inactive">inactive</option>
					</select>
					<label>Role:</label>
					<select
						name="role"
						value={form.role}
						onChange={handleChange}
					>
						<option value="role">role</option>
						<option value="admin">admin</option>
						<option value="manager">manager</option>
					</select>
					<div className="button">
						<button type="submit">Add admin</button>
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
