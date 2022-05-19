<template>
  <div class="info-panel">
    <h3>{{title}}</h3>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    title: {
      type: String,
      default: 'Infomation',
    },
  },
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
  min-height: 100px;
  border-radius: 10px;
  background-color: rgba($color: #fff, $alpha: 0.8);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 5px 2px rgba($color: #000, $alpha: 0.1);
  margin-bottom: 20px;
  &:nth-last-of-type(1){
    margin-bottom: 0;
  }
  div.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  h3{
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 18px;
    text-align: left;
    font-weight: bold;
  }
}
</style>
