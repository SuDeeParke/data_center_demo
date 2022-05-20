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
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  min-height: 100px;
  border-radius: 10px;
  background-color: rgba($color: #fff, $alpha: 0.8);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 5px 2px rgba($color: #000, $alpha: 0.1);
  margin-bottom: 20px;
  border-right: 5px solid var(--theme-color);
  overflow: hidden;
  transition: all 0.3s ease-out;
  // &::before{
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   background-color: var(--theme-color);
  //   transform: translate(100%,0);
  //   transition: all 0.3s ease-in;
  //   z-index: -1;
  // }
  &:nth-last-of-type(1){
    margin-bottom: 0;
  }
  // &:hover{
  //   color: #f6f6f6;
  //   &::before{
  //       transform: translate(0%,0);
  //     }
  // }
  div.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 1;
    cursor: default;
  }
  h3{
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 18px;
    text-align: left;
    font-weight: bold;
    z-index: 1;
    cursor: default;
    pointer-events: none;
  }
}
</style>
