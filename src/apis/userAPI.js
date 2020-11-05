/* eslint-disable no-useless-concat */
import axiosClient from "./axiosClient";

const userAPI = {
	login: (username, password) => {
		const url = "/manager/login";
		return axiosClient.post(url, { username, password });
	},
	getAll: (params) => {
		const url = "/secure/user/list";
		return axiosClient.get(url, {params})
	},
	adUser: (params) => {
		const url ="/secure/user/create";
		return axiosClient.post(url, params)
	},
	update: (params) => {
		const url = "/secure/user/" + `${params._id}`;
		return axiosClient.put(url, params)
	},
};

export default userAPI;
