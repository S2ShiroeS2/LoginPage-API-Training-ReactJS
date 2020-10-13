/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import categoryAPI from "../../apis/categoryAPI";
import "./Style-InsertItem.css";

export default function InsertItem() {
	const history = useHistory();
	const [form, setForm] = useState({
		tag: "",
		status: false,
		description: "",
	});

	const insertNewTag = async () => {
		try {
			const params = {
				tag: form.tag,
				status: form.status,
				description: form.description,
			};
			await categoryAPI.postTag(params);
		} catch (err) {
			console.log("Failed to insert item in API", err);
		}
	};

	const handleRoute = (path) => {
		history.push(path);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		insertNewTag();
		handleRoute("/category")
	};

	return (
		<div className="category-add">
			<div className="add-header">
				<h1>Add Category</h1>
				<a>
					<button onClick={() => handleRoute("/category")}>
						BACK TO LISTING
					</button>
				</a>
			</div>
			<div className="add-form">
				<form onSubmit={handleSubmit}>
					<div>
						<label>Tag:</label>
						<input
							type="text"
							name="tag"
							value={form.tag}
							placeholder="Tag"
							onChange={handleChange}
						/>
					</div>
					<label>Status:</label>
					<select
						name="status"
						value={form.status}
						onChange={handleChange}
					>
						<option value="active">active</option>
						<option value="disable">disabled</option>
					</select>
					<label>Description:</label>
					<input
						type="text"
						name="description"
						value={form.description}
						placeholder="Description"
						onChange={handleChange}
					/>
					<div className="button">
						<button type="submit">Add Tag</button>
						<button>Reset</button>
						<button>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}
