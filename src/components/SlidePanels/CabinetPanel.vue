<template>
  <div class="slide-panel">
    <div class="title-block">
      <h1 class="panel-title">机柜</h1>
    </div>
    <div class="panel-wrap">
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
        <div class="info electric">
          <span class="value">498</span><span class="unit"> kW·h</span>
        </div>
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
}
.info{
  font-size: 100px;
  vertical-align: bottom;
  text-align: center;
  .unit{
    font-size: 50px;
  }
}
.electric{
  font-size: 16px;
  .value{
    font-size: 67px;
  }
  .unit{
    font-size: 36px;
  }
}
</style>
