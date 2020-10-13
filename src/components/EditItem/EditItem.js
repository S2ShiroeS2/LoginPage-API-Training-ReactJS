/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import categoryAPI from "../../apis/categoryAPI";
import "./Style-EditItem.css";

export default function EditItem(props) {
	const history = useHistory();
	const item = useSelector(state => state.item.listItem);
	const [bindForm, setBindForm] = useState({
		tag: "",
		status: false,
		description: "",
	});

	useEffect(() => {
		item.map((item) => {
			setBindForm({
				...bindForm,
				tag: item.tag,
				status: item.status,
				description: item.description
			})
		})
	}, [])

	const updateTag = async () => {
		try {
			const params = {
				tag: bindForm.tag,
				status: bindForm.status,
				description: bindForm.description,
			};
			await categoryAPI.update(params);
		} catch (err) {
			console.log("Failed to insert item in API", err);
		}
	};

	const handleRoute = (path) => {
		history.push(path);
	};
	const handleChange = (e) => {
		setBindForm({
			...bindForm,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		updateTag();
		handleRoute("/category");
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
					<label>Status:</label>
					<select
						name="status"
						value={bindForm.status}
						onChange={handleChange}
					>
						<option value="active">active</option>
						<option value="disabled">disabled</option>
					</select>
					<label>Description:</label>
					<input
						type="text"
						name="description"
						value={bindForm.description}
						placeholder="Description"
						onChange={handleChange}
					/>
					<div className="button">
						<button type="submit">Edit Tag</button>
						<button>Reset</button>
						<button>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}
