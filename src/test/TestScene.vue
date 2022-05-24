<template>
  <div class="test-scene" id="testScene"></div>
</template>

<script>
import Basic from '@/libs/Basic';
import * as THREE from 'three';

export default {
  name: 'TestScene',
  mounted() {
    const TestScene = new Basic();
    TestScene.init('testScene', 'bak5').then((res) => {
      const { scene } = res;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.userData.pickble = true;
      scene.add(cube);
    });

    TestScene.render();
    window.addEventListener('dblclick', (event) => {
      if (event.button === 0) {
        TestScene.updatePointer(event);
        TestScene.handlePick();
      }
    });
    window.addEventListener('pointermove', (event) => {
      TestScene.updatePointer(event);
      TestScene.checkIntersection();
    });
    window.TestScene = TestScene;
  },
};
</script>

<style lang="scss" scoped>
</style>
