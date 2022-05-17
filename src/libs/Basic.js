import * as THREE from 'three';
import { OrbitControls } from '@/assets/js/OrbitControls';

export default class Basic {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }

  initScene() {
    this.scene = new THREE.Scene();
    // 灯光
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(20, 20, 20);
    this.scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(ambientLight);
    return this.scene;
  }

  addControls() {
    if (this.camera && this.renderer) {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.listenToKeyEvents(window);
      // 设置滑动惯性
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      // 配置是否能够zoom
      controls.enableZoom = true;
      // 配置最远和最近距离
      controls.minDistance = 5;
      controls.maxDistance = 100;
      // 定义当平移的时候摄像机的位置将如何移动
      controls.screenSpacePanning = false;
      // 垂直旋转的角度的上限
      // controls.maxPolarAngle = Math.PI / 2;
      this.controls = controls;
    }
  }

  render = () => {
    if (this.renderer) {
      this.renderer.render();
    }
  }
}
