<template>
  <div class="slide-panel">
    <div class="title-block">
      <h1 class="panel-title">设置</h1>
    </div>
    <div class="panel-wrap">
      <InfoPanel title="深色模式"></InfoPanel>
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
