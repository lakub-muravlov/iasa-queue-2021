<template>
<div class="full-queue">
  <div class="flex-container fd-column ai-center">
    <h1>Черга</h1>
    <div class="link-wrap">
      <router-link to="/">Головна</router-link>
    </div>
    <div class="queue-wr">
      <p
          class="num"
          v-for="(q, i) of queue"
          :key="q"
      >
        {{i + 1}}. {{ q | number(q) }}
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "QueueFull",
  props: ['queue'],
  mounted() {
    setInterval(() => {
      this.$emit('update')
    }, 3000)
  }
}
</script>

<style scoped>

</style>