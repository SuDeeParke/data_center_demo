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
      const geometry2 = new THREE.BoxGeometry();
      const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
      const cube2 = new THREE.Mesh(geometry2, material2);
      const geometry3 = new THREE.BoxGeometry();
      const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const cube3 = new THREE.Mesh(geometry3, material3);

      cube.userData.pickble = true;
      cube2.userData.pickble = true;
      cube3.userData.pickble = true;

      cube2.position.set(5, 5, 5);
      cube3.position.set(-5, -5, -5);

      cube.castShadow = true;
      cube2.castShadow = true;
      cube3.castShadow = true;

      scene.add(cube);
      scene.add(cube2);
      scene.add(cube3);

      const axes = new THREE.AxisHelper(10);
      scene.add(axes);
      // 平面
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -0;
      // 设置平面需要接收阴影
      plane.receiveShadow = true;
      scene.add(plane);
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
