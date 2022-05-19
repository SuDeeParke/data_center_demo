<template>
  <div class="slide-panel">
    <h1 class="panel-title">机柜</h1>
    <InfoPanel title="可用容量">
      <div class="info"><span class="value">20</span><span class="unit"> u</span></div>
    </InfoPanel>
    <InfoPanel title="总容量">
      <div class="info"><span class="value">42</span><span class="unit"> u</span></div>
    </InfoPanel>
    <InfoPanel title="平均温度">
      <div class="info"><span class="value">24</span><span class="unit"> ºC</span></div>
    </InfoPanel>
    <InfoPanel title="用电量">
      <div class="info"><span class="value">498</span><span class="unit"> kW·h</span></div>
    </InfoPanel>
  </div>
</template>

<script>
import InfoPanel from '../components/InfoPanel.vue';

export default {
  components: { InfoPanel },

};
</script>

<style lang="scss" scoped>
.slide-panel{
  @include slidePanel;
  h1.panel-title{
    text-align: left;
    font-size: 36px;
    padding: 20px 0;
  }
}
.info{
  font-size: 100px;
  vertical-align: bottom;
  text-align: center;
  .unit{
    font-size: 50px;
  }
}
</style>
