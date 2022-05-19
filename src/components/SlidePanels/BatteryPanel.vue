<template>
  <div class="slide-panel">
    <h1 class="panel-title">蓄电池</h1>
    <InfoPanel title="电池状态">
      <div class="battery"><span class="value">充电中</span><span class="unit"> </span></div>
    </InfoPanel>
    <InfoPanel title="电量">
      <div class="info"><span class="value">42</span><span class="unit"> %</span></div>
    </InfoPanel>
    <InfoPanel title="健康度">
      <div class="info"><span class="value">80</span><span class="unit"> %</span></div>
    </InfoPanel>
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
.battery{
  .value{
    font-size: 67px;
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
