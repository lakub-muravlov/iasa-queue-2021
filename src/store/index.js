import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {
		async fetchTime() {
			const min = (await axios.get("api/time")).data.res;
			if (isNaN(min)) {
				return 1;
			}
			return min;
		},
		async freezePerson({}, { idx }) {
			axios.get(`/api/queue-freeze/?idx=${idx}`);
		},
		async swapPersons({}, { first, second }) {
			axios.get(`/api/queue-swap/?first=${first}&second=${second}`);
		},
		async addPersonToQueue({}, { number }) {
			axios.get(`/api/queue-add/?num=${number}`);
		},
		async deletePersonFromQueue({}, { number }) {
			axios.get(`/api/queue-del/?num=${number}`);
		},
		async fetchQueue() {
			try {
				const queue = axios.get(`/api/queue-fetch/`).then((response) => {
					return response.data;
				});
				return queue; /*? Object.keys(queue).map(key => ({ ...queue[key], id: key })) : []*/
			} catch (e) {
				throw e;
			}
		},
	},
	modules: {
		auth,
	},
});
