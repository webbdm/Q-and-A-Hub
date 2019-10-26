import axios from 'axios';

const baseURL = 'http://localhost:4000';

// export const api = {
//     get: url => axios.get(`${baseURL}` + `${url}`),
//     post: url => axios.post(`baseURL` + `${url}`),
//     put: url => axios.put(`baseURL` + `${url}`),
//     delete: url => axios.delete`baseURL` + `${url}`
// }

export const questionsApi = {
    get: () => axios.get(`${baseURL}/questions`),
};

export const answersApi = {
    get: options => axios.get(`${baseURL}/answers`, options),
    post: answer => axios.post(`${baseURL}/answers`, answer)
};