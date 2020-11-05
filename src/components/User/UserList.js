/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userAPI from "../../apis/userAPI";
import Pagination from "../Pagination/Pagination";
import User from "../User/User";
import "./Style-UserList.css";

export default function UserList() {
	const history = useHistory();
	const [listUser, setListUser] = useState([]);
	const [showOption, setShowOption] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(5);
	const [totalRecord, setTotalRecord] = useState(0);
	const [inputSearch, setInputSearch] = useState({ search: "" });

	useEffect(() => {
		getListUser();
	}, []);

	const getListUser = async (pg = page, pgSize = pageSize) => {
		try {
			const params = {
				skip: (pg - 1) * pageSize,
				limit: pgSize,
			};
			const response = await userAPI.getAll(params);
			if (response && response.success === true) {
				setListUser(response.data.list);
				setTotalRecord(response.data.sum);
			}
		} catch (err) {
			console.log("Failed to fetch list user in API", err);
		}
	};

	const handleClickItem = (id) => {
		if (showOption === id) {
			setShowOption(null);
		} else {
			setShowOption(id);
		}
	};

	const handleRoute = (path) => {
		history.push(path);
	};

	const renderUserList = () => {
		if (listUser) {
			return listUser.map((user) => (
				<User
					key={user._id}
					data={user}
					onPress={() => handleClickItem(user._id)}
					showOption={showOption === user._id}
					handleChangeStatus={user._id}
				/>
			));
		}
	};

	const userList = renderUserList();

	const prevPage = async () => {
		const pg = page === 1 ? 1 : page - 1;
		getListUser(pg);
		setPage(pg);
	};

	const nextPage = async () => {
		const pg = page < Math.ceil(totalRecord / pageSize) ? page + 1 : page;
		getListUser(pg);
		setPage(pg);
	};

	const handlePagination = (i) => {
		getListUser(i);
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

	const handleChangeTextSearch = (e) => {
		setInputSearch({ ...inputSearch, [e.target.name]: e.target.value });
		console.log(inputSearch);
	};

	const searchUser = async (e) => {
		e.preventDefault();
		const userListTemp = listUser;
		userListTemp.map((user) => {
			console.log(user.firstName.toLowerCase() + "/" + inputSearch.toString().toLowerCase());
			// if(user.firstName.toString().toLowerCase() === inputSearch.toString().toLowerCase()) {
			// 	console.log(user)
			// } else {
			// 	console.log("Not Found");
			// }
		});
	};

	return (
		<div className="User">
			<div className="User-header">
				<h1>User</h1>
			</div>
			<div className="User-container">
				<div className="search-bar-container">
					<div className="search-bar">
						<div className="wrap">
							<form onSubmit={searchUser} className="search">
								<label>Search</label>
								<input
									type="text"
									name="textSearch"
									onChange={handleChangeTextSearch}
								/>
								<input type="submit" value="SEARCH" />
							</form>
						</div>
						<a>
							<button onClick={() => handleRoute("/user/insert")}>
								ADD User
							</button>
						</a>
					</div>
				</div>
				<div className="User-table">
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
										<td className="username">User name</td>
										<td className="gender">Gender</td>
										<td className="register-from">
											Register From
										</td>
										<td className="create-date">
											create date
										</td>
										<td className="status">Status</td>
										<td className="action">Action</td>
									</tr>
								</thead>
								<tbody className="table-body">
									{/* Render Item */}
									{userList}
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
