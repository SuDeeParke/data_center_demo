import * as THREE from 'three';

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

  initCamera = () => { }

  initRenderer = () => { }

  render = () => {
    if (this.renderer) {
      this.renderer.render();
    }
  }
}
