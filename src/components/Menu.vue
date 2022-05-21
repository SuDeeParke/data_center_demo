<template>
  <div class="menu" >
    <template v-for="(item, index) in buttonList">
    <button
        :class="['basic-button', {'selected': activeButton === item.name}]"
        :name="item.name"
        :key="index"
        @click="handleClick(item)"
    >
          <i :class="['iconfont-menu', item.class]"></i>
        </button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activeButton: '',
      buttonList: [
        {
          name: '机柜',
          class: 'icon-jiguihang',
        },
        {
          name: '蓄电池',
          class: 'icon-xudianchi',
        },
        {
          name: '空调',
          class: 'icon-kongtiao',
        },
        {
          name: '照明',
          class: 'icon-zhaoming',
        },
        {
          name: '设置',
          class: 'icon-shezhi',
        },
      ],
      sharedState: this.$store.state,
    };
  },
  methods: {
    handleClick(cur) {
      this.activeButton = cur.name;
      this.$store.state.acctivePanel = cur.name;
    },
  },
  mounted() {
    this.$store.state.acctivePanel = this.activeButton;
  },
};
</script>

<style lang="scss" scoped>
$selectedShadow: 2px 2px 5px 2px rgba($color: #000, $alpha: 0.3);
.menu{
  display: block;
  width: 100%;
  background-color: var(--panel-bg-color);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-end-end-radius: 10px;
  transition: all .4s;
  button.basic-button {
    display: block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: none;
    border-radius: 100%;
    box-shadow: 0 0 2px 2px rgba($color: #000, $alpha: 0.2);
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;
    background-color: var(--panel-bg-color);
    &:hover{
    //  box-shadow: inset $selectedShadow;
      i{
        color: var(--theme-color);
      }
    }
    i{
      color: var(--font-color);
      font-size: 30px;
      transition: all 0.3s;
    }
  }
  button.basic-button:nth-last-of-type(1){
    margin-bottom: 0;
  }

  button.selected {
    box-shadow: inset $selectedShadow;
    transition: all 0.3s;
    i{
        color: var(--theme-color);
    }
  }
}

</style>
