<template>
  <div class="interface">
    <section class="top">
      <TopBrand></TopBrand>
    </section>
    <section class="left">
      <Menu></Menu>
    </section>
    <section class="right">
      <CabinetPanel></CabinetPanel>
    </section>
    <section class="bottom"></section>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import TopBrand from '../components/TopBrand.vue';
import CabinetPanel from './CabinetPanel.vue';

export default {
  name: 'Interface',
  components: { Menu, TopBrand, CabinetPanel },
};
</script>

<style lang="scss" scoped>
$leftWidth: 80px;
$rightWidth: 300px;
$topHight: 70px;
$bottomHight: 50px;

$calcHight: calc(100% - $topHight - $bottomHight);
$calcWidth: calc(100% - $leftWidth - $rightWidth);
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
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
    background: rgba($color: #000, $alpha: 0.5);
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
    align-items: flex-start;
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
