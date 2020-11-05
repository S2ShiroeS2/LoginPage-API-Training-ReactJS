/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import adminAPI from "../../apis/adminAPI";
import Pagination from "../Pagination/Pagination";
import { useHistory } from "react-router-dom";
import Admin from "../Admin/Admin";
import "./Style-AdminList.css";

export default function AdminList() {
	const history = useHistory();
	const [listAdmin, setListAdmin] = useState([]);
	const [showOption, setShowOption] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(5);
	const [totalRecord, setTotalRecord] = useState(0);

	useEffect(() => {
		getListAdmin();
	}, []);

	const getListAdmin = async (pg = page, pgSize = pageSize) => {
		try {
			const params = {
				skip: (pg - 1) * pageSize,
				limit: pgSize,
			};
			const response = await adminAPI.getAll(params);
			if (response && response.success === true) {
				setListAdmin(response.data.list);
				setTotalRecord(response.data.sum);
			}
		} catch (err) {
			console.log("Failed to fetch list admin in API", err);
		}
	};

	const handleClickItem = (id) => {
		if (showOption === id) {
			setShowOption(null);
		} else {
			setShowOption(id);
		}
	};

	const renderAdminList = () => {
		if (listAdmin) {
			return listAdmin.map((admin) => (
				<Admin
					key={admin._id}
					data={admin}
					onPress={() => handleClickItem(admin._id)}
					showOption={showOption === admin._id}
					handleChangeStatus={admin._id}
				/>
			));
		}
	};

	const adminList = renderAdminList();

	const handleRoute = (path) => {
		history.push(path);
	};

	const prevPage = async () => {
		const pg = page === 1 ? 1 : page - 1;
		getListAdmin(pg);
		setPage(pg);
	};

	const nextPage = async () => {
		const pg = page < Math.ceil(totalRecord / pageSize) ? page + 1 : page;
		getListAdmin(pg);
		setPage(pg);
	};

	const handlePagination = (i) => {
		getListAdmin(i);
		setPage(i);
	};

	const renderPagination = () => {
		const total =
			page < Math.ceil(totalRecord / pageSize) ? page + 1 : page;
		var arrPage = [];
		for (var i = 0; i < total; i++) {
			// console.log("i = ",i + "/page = ", page);
			arrPage.push(
				<Pagination
					key={i}
					currentPage={page}
					count={i + 1}
					handlePagination={() => handlePagination(i)}
				/>
			);
		}
		return arrPage;
	};

	return (
		<div className="Admin">
			<div className="Admin-header">
				<h1>Admin</h1>
			</div>
			<div className="Admin-container">
				<div className="search-bar-container">
					<div className="search-bar">
						<div className="wrap">
							<form className="search">
								<label>Search</label>
								<input type="text" />
								<input type="submit" value="SEARCH" />
							</form>
						</div>
						<a>
							<button
								onClick={() => handleRoute("/admin/insert")}
							>
								ADD Admin
							</button>
						</a>
					</div>
				</div>
				<div className="Admin-table">
					<div className="selection">
						<select>
							<option>Select Action</option>
							<option>Make Active</option>
							<option>Make Inactive</option>
							<option>Make Delete</option>
						</select>
					</div>
					<div className="export">
						<button>EXPORT</button>
					</div>
					<div className="clear"></div>
					<div className="table">
						<div className="wrap-table">
							<table>
								<thead className="table-head">
									<tr className="table-head-row">
										<td className="avatar">Avatar</td>
										<td className="name">Name</td>
										<td className="email">User Name</td>
										<td className="role">Role</td>
										<td className="login-time">
											Last Login Time
										</td>
										<td className="status">Status</td>
										<td className="action">Action</td>
									</tr>
								</thead>
								<tbody className="table-body">
									{/* Render Item */}
									{adminList}
								</tbody>
							</table>
							<div>
								<div className="show-info">
									Show{" "}
									<span>{(page - 1) * pageSize + 1}</span> to{" "}
									<span>
										{page * pageSize <= totalRecord
											? page * pageSize
											: totalRecord}
									</span>{" "}
									of total
									<span> {totalRecord} </span>
								</div>
								<div className="paginate">
									<ul className="pagination">
										<li className="previous">
											<a
												tabIndex="0"
												role="button"
												aria-disabled="true"
												onClick={() => prevPage()}
											>
												prev
											</a>
										</li>
										{renderPagination()}
										<li className="next">
											<a
												tabIndex="0"
												role="button"
												aria-disabled="true"
												onClick={() => nextPage()}
											>
												next
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
