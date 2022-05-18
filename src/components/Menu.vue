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
      activeButton: '机柜',
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
    };
  },
  methods: {
    handleClick(cur) {
      this.activeButton = cur.name;
    },
  },
};
</script>

<style lang="scss" scoped>
$themeColor: #337ab7;
$selectedShadow: 2px 2px 5px 2px rgba($color: #000, $alpha: 0.3);
.menu{
  display: block;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.8);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-end-end-radius: 10px;
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
    &:hover{
    //  box-shadow: inset $selectedShadow;
      i{
        color: #337ab7;
      }
    }
    i{
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
        color: #337ab7;
    }
  }
}

</style>
