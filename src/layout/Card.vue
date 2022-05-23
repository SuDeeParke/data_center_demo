<template>
  <div class="card">
      <h1>{{title}}</h1>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      defalut: 'test',
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
    padding: 50px 30px;
    // border: 1px solid #000;
    h1 {
        font-size: 36px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
        line-height: 54px;
        text-align: left;
        position: relative;
        z-index: 0;
        &::before {
            content: "";
            width: 110%;
            height: 2px;
            background: rgba(10, 255, 245, 1);
            position: absolute;
            top: 100%;
            left: -5%;
            z-index: 0;
        }
        &::after {
            content: "";
            width: 100%;
            height: 3px;
            background: rgba(151, 150, 150, 0.9);
            position: absolute;
            top: 100%;
            left: 0%;
            z-index: 0;
        }
    }
}
</style>
