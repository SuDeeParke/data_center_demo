<template>
  <div id="scene"></div>
</template>

<script>
import Basic from '@/libs/Basic';
// import Building from '@/libs/Building';

export default {
  name: 'Scene',
  mounted() {
    const DataCenter = new Basic();
    DataCenter.init('scene').then(() => {
      DataCenter.addModle('models/data_center_empty/JiFang.gltf', 'gltf');
      DataCenter.refcAddModle('models/aircondition/scene.gltf', {
        pickable: true,
        scale: 2,
        arr: [10, 0, 10],
      });
    });
    // const building = new Building();
    // building.init(DataCenter.scene, 'models/office_building/scene.gltf');
    // building.registerEvent('dblclick');
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
#scene{
  user-select: none;
}
</style>
