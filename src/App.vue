<template>
	<div id="app">
		<router-view @update="updateQueue" :queue="queue" v-model="queue" />
	</div>
</template>

<style lang="scss">
@import "assets/styles/styles";
</style>
<script>
import AdminPanel from "@/views/AdminPanel";
import Queue from "@/views/Queue";
import QueueFull from "@/views/QueueFull";

export default {
	components: { AdminPanel, Queue, QueueFull },
	data: () => ({
		queue: [],
	}),
	async mounted() {
		this.queue = await this.$store.dispatch("fetchQueue");
	},
	methods: {
		async updateQueue() {
			this.queue = await this.$store.dispatch("fetchQueue");
		},
	},
};
</script>
