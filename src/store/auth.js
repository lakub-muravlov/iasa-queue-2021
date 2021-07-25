import axios from "axios";

export default {
	actions: {
		async login({}, { email, password }) {
			try {
				return axios
					.get(`/api/reg/?login=${email}&pass=${password}`)
					.then((responce, rej) => {
						if (responce.data.res !== "11") {
							return false;
						}
						return true;
					});
			} catch (e) {
				alert("wrong login or password");
				throw e;
			}
		},
	},
};
