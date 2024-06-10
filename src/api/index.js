import axios from 'axios';
import config from '../config';
import { isEmpty } from 'lodash';

const callWebService = (options) => {
	const axiosInstance = axios.create({
		baseURL: config.serverURL,
		withCredentials: true,
		timeout: 1000 * 10
	});
	return axiosInstance(options);
};

/**
 * options=
 * {
 *  method:"GET","POST","PUT","DELETE",
 * url:"/user?quer"
 * data:{
 *  content
 * }
 * }
 */

const callApi = (
	method = 'get',
	url,
	data = {},
	headers = {
		'content-type': 'application/json',
		Accept: 'application/json'
	},
	socket
) => {
	let serverURL = config.serverURL;
	if (socket) {
		serverURL = config.SERVER_SOCKET_URL
	}
	return new Promise(function (resolve, reject) {
		// console.log('data is#######', url, data, headers);
		if (method === 'get' && !isEmpty(data)) {
			let queryParams = encodeURI(JSON.stringify(data));
			url = `${serverURL}/${url}?params=${queryParams}`;
		} else {
			url = `${serverURL}/${url}`;
		}
		console.log( "url:", url)

		let options = {
			method,
			url,
			data,
			headers,
			withCredentials: true,
			timeout: 1000 * 10
		};
		if (method === 'get') {
			delete options['data'];
		}
		axios({
			...options
		})
			.then((response) => {
				return resolve(response);
			})
			.catch((err) => {
				return reject(err);
			});
	});
};

export { callWebService, callApi };
