<template>
  <div class="slide-panel">
    <div class="title-block">
      <h1 class="panel-title">统计</h1>
    </div>
    <div class="panel-wrap">
      <InfoPanel title="室温">
      <div class="info"><span class="value">24</span><span class="unit"> ºC</span></div>
      </InfoPanel>
      <InfoPanel title="当日耗电量">
        <div class="info"><span class="value">498</span><span class="unit"> kW·h</span></div>
      </InfoPanel>
      <InfoPanel title="机柜可用容量">
        <div class="info"><span class="value">567</span><span class="unit"> u</span></div>
      </InfoPanel>
    </div>
  </div>
</template>

<script>
import InfoPanel from '../InfoPanel.vue';

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
