<template>
  <div id="scene"></div>
</template>

<script>
import Basic from '@/libs/Basic';
import Building from '@/libs/Building';

export default {
  name: 'Scene',
  mounted() {
    const DataCenter = new Basic();
    DataCenter.init('scene').then(() => {
      DataCenter.addModle('models/data_center_full/JiFang.gltf', 'gltf');
    });
    new Building().init(DataCenter.scene, 'models/office_building/scene.gltf');
    DataCenter.render();

    //  window.addEventListener('resize', () => { Tools.onWindowResize(this.basicScene); });
    window.addEventListener('dblclick', (event) => {
      if (event.button === 0) {
        DataCenter.updatePointer(event);
        DataCenter.handlePick();
      }
    });
    window.addEventListener('pointermove', (event) => {
      DataCenter.updatePointer(event);
      DataCenter.checkIntersection();
    });
    window.DataCenter = DataCenter;
  },
};
</script>

<style lang="scss" scoped>

</style>
