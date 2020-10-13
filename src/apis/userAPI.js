import axiosClient from "./axiosClient";

const userAPI = {
	post: (username, password) => {
		const url = "/manager/login";
		return axiosClient.post(url, { username, password });
	},
};

export default userAPI;
