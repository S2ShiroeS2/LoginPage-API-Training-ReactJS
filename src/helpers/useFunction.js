function convertDate(propDate) {
	const date = new Date(propDate);
	return date.toLocaleString();
}

function handleRoute (history, path) {
	history.push(path);
};



export { convertDate, handleRoute};
