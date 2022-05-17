import * as THREE from 'three';
import { EffectComposer } from '@/assets/js/postprocessing/EffectComposer';
import { RenderPass } from '@/assets/js/postprocessing/RenderPass';
// import { OutlinePass } from '@/assets/js/postprocessing/OutlinePass';
// import { ShaderPass } from '@/assets/js/postprocessing/ShaderPass';
// import { FXAAShader } from '@/assets/js/postprocessing/FXAAShader';

export default class BasicRender {
  constructor() {
    this.renderer = null;
    this.composer = null;
    this.activeRenderer = null;
    this.renderer = this.createRender();
  }

  createRender = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.BasicDepthPacking;
    this.activeRenderer = renderer;
    return renderer;
  }

  createComposer(scene, camera) {
    this.composer = new EffectComposer(this.renderer);
    if (this.scene && this.camera) {
      const renderPass = new RenderPass(scene, camera);
      this.composer.addPass(renderPass);
      this.addOutlineEffect();
      this.addFXAAEffect();
    }
    this.activeRenderer = this.composer;
    return this.composer;
  }

  addShadow() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  addPicker() {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }
}
