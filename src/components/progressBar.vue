<template>
  <div class="progress-container">
    <div class="progress" v-bind:style="{width: progress + '%'}">
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress'],
}
</script>

<style scoped>
.progress-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
.progress {
  background-color:#e66e6e;
  height: 24px;
  transition: all ease-out 0.4s;
}
</style>
