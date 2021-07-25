<template>
	<div class="admin">
		<div v-if="!allowed" class="not-allowed flex-container fd-column jc-center">
			<div class="header flex-container jc-center ai-center">
				<div class="admin-h flex-container col-3 fd-column ai-center jc-center">
					<img src="../../public/img/logo_yellow.png" alt="" />
					<h1>ADMIN PANEL</h1>
				</div>
			</div>
			<div class="flex-container jc-center">
				<form
					@submit.prevent="tryToLogin"
					class="login-form flex-container col-3 col-6-m ai-center jc-center fd-column"
				>
					<input type="text" placeholder="login" v-model="login" />
					<input type="password" placeholder="password" v-model="pass" />
					<button type="submit">TRY</button>
				</form>
			</div>
		</div>
		<div class="allowed flex-container fd-row-reverse" v-else>
			<div class="queue flex-container col-6 fd-column">
				<div
					class="flex-container jc-center queue-number"
					v-for="q of queue"
					:key="q"
				>
					{{ q }}
				</div>
			</div>
			<div class="flex-container col-6 fd-column">
				<form @submit.prevent="addPersonHandler" class="form">
					<label class="flex-container" for="add">Add person number...</label>
					<input class="col-6" type="number" id="add" v-model="numToAdd" />
					<button class="col-6" type="submit">Add</button>
				</form>
				<form @submit.prevent="deletePersonHandler" class="form">
					<label class="flex-container" for="delete"
						>Delete person number...</label
					>
					<input class="col-6" type="number" id="delete" v-model="numToDel" />
					<button class="col-6" type="submit">Delete</button>
				</form>
				<form @submit.prevent="swapPersonHandler" class="form">
					<label class="flex-container" for="swap">Swap two persons</label>
					<div class="flex-container swap">
						<input
							class="col-3"
							type="number"
							id="swap"
							placeholder="first person"
							v-model="firstSwap"
						/>
						<input
							class="col-3"
							type="number"
							id="swap1"
							placeholder="second person"
							v-model="secondSwap"
						/>
						<button class="col-3" type="submit">Swap</button>
					</div>
				</form>
				<form @submit.prevent="freezePersonHandler" class="form">
					<label class="flex-container" for="pos"
						>-5 positions for person</label
					>
					<input class="col-6" type="number" id="pos" v-model="numToFreeze" />
					<button class="col-6" type="submit">-5</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminPanel",
	props: ["queue"],
	data: () => ({
		allowed: false,
		numToAdd: 0,
		numToDel: 0,
		firstSwap: 0,
		secondSwap: 0,
		numToFreeze: 0,
		pass: "",
		login: "",
	}),
	mounted() {
		setInterval(() => {
			this.$emit("update");
		}, 3000);
	},
	methods: {
		async freezePersonHandler() {
			if (this.numToFreeze <= 0) {
				this.numToFreeze = 0;
				return;
			}

			try {
				const idx = this.queue.indexOf(parseInt(this.numToFreeze));
				console.log(idx, "index");
				await this.$store.dispatch("freezePerson", { idx });
				this.numToFreeze = 0;
				this.$emit("update");
			} catch (e) {
				this.numToFreeze = 0;
				throw e;
			}
		},
		async swapPersonHandler() {
			if (this.firstSwap <= 0 || this.secondSwap <= 0) {
				this.firstSwap = 0;
				this.secondSwap = 0;
				return;
			} else if (
				this.firstSwap > this.queue.length ||
				this.secondSwap > this.queue.length
			) {
				this.firstSwap = 0;
				this.secondSwap = 0;
				return;
			}

			try {
				const swapData = {
					first: this.firstSwap,
					second: this.secondSwap,
				};
				await this.$store.dispatch("swapPersons", swapData);
				this.firstSwap = 0;
				this.secondSwap = 0;
				this.$emit("update");
			} catch (e) {
				this.firstSwap = 0;
				this.secondSwap = 0;
				throw e;
			}
		},
		async tryToLogin() {
			console.log("try to login");
			const formData = {
				email: this.login,
				password: this.pass,
			};

			try {
				let res = await this.$store.dispatch("login", formData);
				if (res) {
					this.allowed = true;
				} else {
					this.allowed = false;
					this.pass = "";
					this.login = "";
				}
			} catch (e) {
				this.pass = "";
				this.login = "";
				throw e;
			}
		},
		async addPersonHandler() {
			if (this.numToAdd <= 0) {
				this.numToAdd = 0;
				return;
			}

			try {
				const person = await this.$store.dispatch("addPersonToQueue", {
					number: this.numToAdd,
				});
				this.numToAdd = 0;
				this.$emit("update");
			} catch (e) {
				throw e;
			}
		},
		async deletePersonHandler() {
			if (this.numToDel <= 0) {
				this.numToDel = 0;
				return;
			}

			try {
				await this.$store.dispatch("deletePersonFromQueue", {
					number: this.numToDel,
				});
				this.numToDel = 0;
				this.$emit("update");
			} catch (e) {
				throw e;
			}
		},
	},
};
</script>
