<template>
  <div class="slide-panel">
    <div class="title-block">
      <h1 class="panel-title">设置</h1>
    </div>
    <div class="panel-wrap">
      <InfoPanel title="深色模式">
        <div class="flex-wrap">
          <label>{{dark?'开启':'关闭'}}</label>
          <el-switch
            v-model="dark"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
        </div>
      </InfoPanel>
      <InfoPanel title="天空盒子">

      </InfoPanel>
      <InfoPanel title="主题色">

      </InfoPanel>
      <InfoPanel title="用户">
        <div class="flex-wrap">
          <el-button type="danger">退出</el-button>
        </div>
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
      dark: false,
      sharedState: this.$store.state,
    };
  },
  mounted() {
    this.dark = this.$store.state.dark;
  },
  watch: {
    dark(newV) {
      this.$store.state.dark = newV;
      if (newV) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },
  },
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
.flex-wrap{
  display: flex;
  width: 80%;
  height: auto;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  label{
    font-size: 1.6rem;
  }
}
</style>
