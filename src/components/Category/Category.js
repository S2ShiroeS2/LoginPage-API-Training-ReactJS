/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import categoryAPI from "../../apis/categoryAPI";
import "./Style-Category.css";
import Item from "../Item/Item";
import Pagination from "../Pagination/Pagination";

export default function Category() {
	const history = useHistory();
	const [listItem, setListItem] = useState([]);
	const [showOption, setShowOption] = useState([]);
	const [totalRecord, setTotalRecord] = useState(0);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);

	useEffect(() => {
		fetchCategoryList();
	}, []);

	const fetchCategoryList = async (pg = page, pgSize = pageSize) => {
		try {
			const params = {
				skip: (pg - 1) * pageSize,
				limit: pgSize,
			};
			const response = await categoryAPI.getAll(params);
			if (response && response.success === true) {
				setListItem(response.data.list);
				setTotalRecord(response.data.sum);
			}
		} catch (err) {
			console.log("Failed to fetch list item in API", err);
		}
	};

	const handleRoute = (path) => {
		history.push(path);
	};

	const handleClickItem = (id) => {
		if (showOption === id) {
			setShowOption(null);
		} else {
			setShowOption(id);
		}
	};

	const prevPage = async () => {
		const pg = page === 1 ? 1 : page - 1;
		fetchCategoryList(pg);
		setPage(pg);
	};

	const nextPage = async () => {
		const pg = page < Math.ceil(totalRecord / pageSize) ? page + 1 : page;
		fetchCategoryList(pg);
		setPage(pg);
	};

	const renderTagsList = () => {
		if (listItem) {
			return listItem.map((item) => (
				<Item
					key={item._id}
					data={item}
					onPress={() => handleClickItem(item._id)}
					showOption={showOption === item._id}
					handleChangeStatus={item._id}
				/>
			));
		}
	};

	const listTags = renderTagsList();

	const handlePagination = (i) => {
		fetchCategoryList(i);
		setPage(i);
	}

	const renderPagination = () => {
		const total =
			page < Math.ceil(totalRecord / pageSize) ? page + 1 : page;
		var arrPage = [];
		for (var i = 0; i < total; i++) {
			arrPage.push(
				<Pagination key={i} currentPage={page} count={i + 1} handlePagination={()=>handlePagination(i)}/>
			);
		}
		return arrPage;
	};

	return (
		<div className="category">
			<div className="category-header">
				<h1>Category</h1>
			</div>
			<div className="category-container">
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
							<button onClick={() => handleRoute("/category/insert")}>
								ADD Category
							</button>
						</a>
					</div>
				</div>
				<div className="category-table">
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
										<td className="name">Name</td>
										<td className="descriptions">
											Descriptions
										</td>
										<td className="match">Match</td>
										<td className="create-date">
											Create date
										</td>
										<td className="status">Status</td>
										<td className="action">Action</td>
									</tr>
								</thead>
								<tbody className="table-body">
									{/* Render Item */}
									{listTags}
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
