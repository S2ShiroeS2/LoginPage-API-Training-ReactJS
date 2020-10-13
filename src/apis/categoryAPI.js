/* eslint-disable no-useless-concat */
import axiosClient from "./axiosClient";

const categoryAPI = {
	getAll: (params) => {
		const url = "/secure/tag/list";
		return axiosClient.get(url, { params });
	},
	getInfoTag: (params) => {
		const url = "/secure/tag/" + `${params.tag}`;
		return axiosClient.get(url, { params });
	},

	postTag: (params) => {
		const url = "/secure/tag/create";
		return axiosClient.post(url, params);
	},
	update: (params) => {
		const url = "/secure/tag/" + `${params.tag}`;
		return axiosClient.put(url, params);
	},
};

export default categoryAPI;
