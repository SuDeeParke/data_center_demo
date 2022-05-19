<template>
  <div class="info-panel">
    <h5>{{title}}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: [{
    title: String,
    default: 'Infomation',
  }],
};
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.info-panel{
  display: block;
  width: 100%;
  height: auto;
  min-height: 200px;
  border-radius: 10px;
  background-color: rgba($color: #fff, $alpha: 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 1px rgba($color: #000, $alpha: 0.1);
}
</style>
