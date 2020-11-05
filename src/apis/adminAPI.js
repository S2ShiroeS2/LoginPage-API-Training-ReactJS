/* eslint-disable no-useless-concat */
import axiosClient from './axiosClient';

const adminAPI = {
	getAll: (params) => {
		const url = "/secure/manager/list";
		return axiosClient.get(url, {params});
	},
	update: (params) => {
		const url = "/secure/manager/" + `${params._id}`;
		return axiosClient.put(url, params)
	},
	adAdmin: (params) => {
		const url ="/secure/manager/create";
		return axiosClient.post(url, params)
	}
}

export default adminAPI;