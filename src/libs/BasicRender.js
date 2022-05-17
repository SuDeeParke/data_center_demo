import * as THREE from 'three';

export default class BasicRender {
  constructor(domID) {
    this.defaultRenderer = null;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.BasicDepthPacking;
    document.getElementById(domID).appendChild(this.renderer.domElement);
    return this.renderer;
  }

  addShadow() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  addComposer(scene, camera) {
    this.composer = new THREE.EffectComposer(this.renderer);
    if (this.scene && this.camera) {
      const renderPass = new THREE.RenderPass(scene, camera);
      this.composer.addPass(renderPass);
      this.addOutlineEffect();
      this.addFXAAEffect();
    }
  }
}
