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
        <el-select v-model="sharedState.skyBox" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </InfoPanel>
      <InfoPanel title="主题色">
        <div class="flex-wrap">
          <label> 请选择颜色</label>
          <el-color-picker v-model="themeColor"></el-color-picker>
        </div>
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
      themeColor: '#337ab7',
      options: [{
        value: 'bak4',
        label: '纯净',
      }, {
        value: 'bak5',
        label: '彩云',
      }, {
        value: 'bak6',
        label: '山清水秀',
      }, {
        value: 'bak7',
        label: '默认',
      }],
      sharedState: this.$store.state,
    };
  },
  mounted() {
    this.dark = this.sharedState.dark;
    const themeColor = document.documentElement.style.getPropertyValue('--theme-color');
    console.log(themeColor);
    if (themeColor) {
      this.themeColor = themeColor;
    }
  },
  watch: {
    dark(newV) {
      this.sharedState.dark = newV;
      if (newV) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },
    'sharedState.skyBox': {
      handler(newV) {
        this.sharedState.skyBox = newV;
        window.cookieStore.set('skyBox', newV);
      },
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
