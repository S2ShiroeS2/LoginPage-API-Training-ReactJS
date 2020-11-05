/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import userAPI from "../../../apis/userAPI";

export default function InsertUser() {
	const history = useHistory();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		status: "",
		gender: "",
		dob: "",
		googleid: "",
		facebookid: "",
		avatar: "",
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

	const insertNewUser = async () => {
		try {
			const params = {
				firstName: form.firstName,
				lastName: form.lastName,
				username: form.username,
				password: form.password,
				status: form.status,
				gender: form.gender,
				dob: form.dob,
				googleid: form.googleid,
				facebookid: form.facebookid,
				avatar: form.avatar,
			};
			await userAPI.adUser(params);
		} catch (err) {
			console.log("Failed to insert admin in API", err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		insertNewUser();
		console.log(form)
		handleRoute("/user");
	};

	return (
		<div className="category-add">
			<div className="add-header">
				<h1>Add User</h1>
				<a>
					<button onClick={() => handleRoute("/user")}>
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
					<label>Date Of Birth:</label>
					<input
						type="text"
						name="dob"
						value={form.dob}
						placeholder="Date Of Birth"
						onChange={handleChange}
					/>
					<label>Google:</label>
					<input
						type="text"
						name="googleid"
						value={form.googleid}
						placeholder="Google ID"
						onChange={handleChange}
					/>
					<label>Facebook:</label>
					<input
						type="text"
						name="facebookid"
						value={form.facebookid}
						placeholder="Facebook ID"
						onChange={e => {handleChange(...e.target.files)}}
					/>
					<label>Avatar:</label>
					<input
						type="file"
						name="avatar"
						value={form.avatar}
						placeholder="Avatar"
						onChange={handleChange}
					/>
					<div className="button">
						<button type="submit">Add user</button>
						<button>Reset</button>
						<button onClick={() => handleRoute("/user")}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
