/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Pagination(props) {
	const count = props.count;
	const currentPage = props.currentPage;

	const handlePagination = props.handlePagination;

	return (
		<li className={count === currentPage ? "active" : ""}>
			<a
				tabIndex="0"
				role="button"
				aria-current="page"
				aria-label="Page 1 is your current page"
				onClick={handlePagination}
			>
				{count}
			</a>
		</li>
	);
}
