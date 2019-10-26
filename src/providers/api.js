import axios from "axios";

const baseURL = "http://localhost:4000";

export const profiles = {
	get: options => axios.get(`${baseURL}/profiles`, options),
	post: data => axios.post(`${baseURL}/profiles`, data),
	put: (data, id) => axios.put(`${baseURL}/profiles/${id}`, data),
	delete: id => axios.delete(`${baseURL}/profiles`, id)
};