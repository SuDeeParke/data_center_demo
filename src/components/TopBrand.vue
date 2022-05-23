<template>
  <div class="top-brand">
    <a @click="refresh()">
      <h1>数据中心运维可视化</h1>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopBrand',
  methods: {
    refresh() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.top-brand {
  display: block;
  width: auto;
  height: 69px;
  padding: 5px 35px;
  border-radius: 0;
  border-end-start-radius: 25px;
  border-end-end-radius: 25px;
  background: var(--panel-bg-color);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--theme-color);
  transition: all .4s;
  user-select: none;
  a {
    display: inline-block;
    text-decoration: none;
    color: var(--font-color);
    font-size: 23px;
    font-family: 'sans-serif';
    cursor: pointer;
    transition: all 0.3s;
    &:hover{
      color: var(--theme-color);
    }
  }
}
</style>
