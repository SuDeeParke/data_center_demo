<template>
  <div class="slide-pannel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'slide-pannel',

};
</script>

<style lang="scss" scoped>
.slide-pannel{
  display: block;
  width: 100%;
  height: auto;
  min-height: 600px;
  max-height: 100%;
  overflow-y: auto;
  background-color: var(--panel-bg-color);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 0;
  border-top-left-radius: 10px;
  border-end-start-radius: 10px;
}
</style>
