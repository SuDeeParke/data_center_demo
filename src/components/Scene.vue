<template>
  <div id="scene">

  </div>
</template>

<script>
import Basic from '@/libs/Basic';

export default {
  name: 'Scene',
  mounted() {
    const scene = new Basic();
    scene.init('scene');
    scene.addModle('models/data_center_full/JiFang.gltf', 'gltf');
    window.scene = scene;
  },
};
</script>

<style lang="scss" scoped>

</style>
