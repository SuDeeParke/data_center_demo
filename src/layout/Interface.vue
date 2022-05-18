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
$leftWidth: 80px;
$rightWidth: 300px;
$topHight: 80px;
$bottomHight: 50px;

$calcHight: calc(100% - $topHight - $bottomHight);
$calcWidth: calc(100% - $leftWidth - $rightWidth);
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
    height: $topHight;
    flex-direction: row;
  }
  section.left {
    top: $topHight;
    left: 0;
    width: $leftWidth;
    height: $calcHight;
    flex-direction: column;
  }
  section.right {
    top: $topHight;
    right: 0;
    width: $rightWidth;
    height: $calcHight;
  }
  section.bottom{
    bottom: 10px;
    left: $leftWidth;
    width: $calcWidth;
    height: $bottomHight;
  }
}

</style>
