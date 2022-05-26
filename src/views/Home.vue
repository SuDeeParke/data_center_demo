<template>
  <div>
    <TestScene v-if="test"></TestScene>
    <Scene v-if="!test"></Scene>
    <Interface v-if="!test"></Interface>
  </div>
</template>

<script>
import Scene from '../layout/Scene.vue';
import Interface from '../layout/Interface.vue';
import TestScene from '../test/TestScene.vue';

export default {
  name: 'Home',
  data() {
    return {
      test: false,
    };
  },
  components: { Scene, Interface, TestScene },
};
</script>
,
    TestScene
<style lang="scss" scoped>

</style>
