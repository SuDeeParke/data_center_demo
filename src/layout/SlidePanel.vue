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
  background-color: var(--panel-bg-color);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-end-end-radius: 10px;
}
</style>
