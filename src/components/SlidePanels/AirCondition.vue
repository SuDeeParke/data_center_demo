<template>
  <div class="slide-panel">
    <h1 class="panel-title">空调</h1>
    <InfoPanel title="室温">
      <div class="info"><span class="value">20</span><span class="unit"> ºC</span></div>
    </InfoPanel>
    <InfoPanel title="空调用电量">
      <div class="info electric"><span class="value">142</span><span class="unit"> kW·h</span></div>
    </InfoPanel>
    <InfoPanel title="全局设定">
     <div class="setting">
      <h2>温度：</h2>
      <h3>{{temperature}}ºC</h3>
      <el-slider
          v-model="temperature"
          :min="16"
          :max="31"
          :format-tooltip="formatTooltip"
        >
      </el-slider>
     </div>
    </InfoPanel>
  </div>
</template>

<script>
import InfoPanel from '../InfoPanel.vue';

export default {
  components: { InfoPanel },
  data() {
    return {
      temperature: 26,
    };
  },
  methods: {
    formatTooltip(val) {
      return `${val}ºC`;
    },
  },
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
    font-size: 42px;
    text-align: right;
  }
}
.electric{
  font-size: 16px;
  .value{
    font-size: 78px;
  }
  .unit{
    font-size: 30px;
  }
}
.setting{
  display: block;
  width: 80%;
  height: 50px;
  h2{
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
  h3{
    display: block;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
