<template>
  <div id="scene"></div>
</template>

<script>
import Basic from '@/libs/Basic';

export default {
  name: 'Scene',
  mounted() {
    const scene = new Basic();
    scene.init('scene');
    scene.addModle('models/data_center_full/JiFang.gltf', 'gltf');
    scene.render();

    //  window.addEventListener('resize', () => { Tools.onWindowResize(this.basicScene); });
    window.addEventListener('dblclick', (event) => {
      if (event.button === 0) {
        scene.updatePointer(event);
        scene.handlePick();
      }
    });
    window.addEventListener('pointermove', (event) => {
      scene.updatePointer(event);
      scene.checkIntersection();
    });
    window.scene = scene;
  },
};
</script>

<style lang="scss" scoped>

</style>
