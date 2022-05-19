<template>
  <div class="slide-panel">
    <div class="title-block">
      <h1 class="panel-title">蓄电池</h1>
    </div>
    <div class="panel-wrap">
      <InfoPanel title="电池状态">
        <div class="battery"><span class="value">{{state}}</span><span class="unit"> </span></div>
        <div class="opration">
          <el-radio v-model="radio" :label="-1">放电</el-radio>
          <el-radio v-model="radio" :label="0">自动</el-radio>
          <el-radio v-model="radio" :label="1">充电</el-radio>
        </div>
      </InfoPanel>
      <InfoPanel title="电量">
        <div class="info"><span class="value">42</span><span class="unit"> %</span></div>
      </InfoPanel>
      <InfoPanel title="健康度">
        <div class="info"><span class="value">80</span><span class="unit"> %</span></div>
      </InfoPanel>
    </div>
  </div>
</template>

<script>
import InfoPanel from '../InfoPanel.vue';

export default {
  components: { InfoPanel },
  data() {
    return {
      radio: 0,
    };
  },
  computed: {
    state() {
      if (this.radio === -1) {
        return '放电';
      }
      if (this.radio === 0) {
        return '自动';
      }
      if (this.radio === 1) {
        return '充电';
      }
      return '自动';
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-panel{
  @include slidePanel;
}
.battery{
  .value{
    font-size: 67px;
  }
}
.opration{
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
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
