<template>
  <div class="interface">
    <section class="top"></section>
    <section class="left"></section>
    <section class="right"></section>
    <section class="bottom"></section>
  </div>
</template>

<script>
export default {
  name: 'Interface',
};
</script>

<style lang="scss" scoped>
.interface{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.2);
  pointer-events: none;
  section{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #ffffff, $alpha: 0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    pointer-events: all;
  }
  section.top{
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
  section.left {
    top: 0;
    left: 0;
    width: 80px;
    height: 100%;
    flex-direction: column;
  }
  section.right {
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
  }
  section.bottom{
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 50px;
  }
}

</style>
