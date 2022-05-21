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
    DataCenter.lights = [];
    DataCenter.cabints = [];
    DataCenter.airs = [];

    DataCenter.init('scene').then(() => {
      if (process.env.VUE_APP_DEV === 'true') {
        DataCenter.addModle('models/data_center_empty/JiFang.gltf', 'gltf');
        DataCenter.refcAddModle('models/aircondition/scene.gltf', {
          pickable: true,
          scale: 2,
          arr: [-22, 0, 22],
          info: {
            id: 'air1',
            type: 'AirCondition',
            desc: '这是一个空调',
          },
        });
        DataCenter.refcAddModle('models/aircondition/scene.gltf', {
          pickable: true,
          scale: 2,
          arr: [20, 0, 6],
          info: {
            id: 'air2',
            type: 'AirCondition',
            desc: '这是一个空调',
          },
        });
        DataCenter.refcAddModle('models/server_console/scene.gltf', {
          pickable: true,
          scale: 1,
          arr: [10, 0, 6],
          info: {
            id: 'cab1',
            type: 'Cabinet',
            desc: '这是一个机柜',
          },
        });
        DataCenter.refcAddModle('models/ceiling_light/scene.gltf', {
          pickable: true,
          scale: 0.2,
          arr: [0, 10, 6],
          info: {
            id: 'light1',
            type: 'Light',
            desc: '这是一个灯',
          },
        });
        DataCenter.refcAddModle('models/ceiling_light/scene.gltf', {
          pickable: true,
          scale: 0.2,
          arr: [-15, 10, 6],
          info: {
            id: 'light2',
            type: 'Light',
            desc: '这是一个灯',
          },
        });
        DataCenter.refcAddModle('models/ceiling_light/scene.gltf', {
          pickable: true,
          scale: 0.2,
          arr: [15, 10, 6],
          info: {
            id: 'light3',
            type: 'Light',
            desc: '这是一个灯',
          },
        });
      } else {
        DataCenter.addModle('models/data_center_full/JiFang.gltf', 'gltf');
      }
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
