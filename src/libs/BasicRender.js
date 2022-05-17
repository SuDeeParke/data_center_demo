import * as THREE from 'three';
import { RenderPass } from '@/assets/js/postprocessing/RenderPass';
import { EffectComposer } from '@/assets/js/postprocessing/EffectComposer';

export default class BasicRender {
  constructor(domID) {
    this.renderer = null;
    this.composer = null;
    this.activeRenderer = null;
    this.addRender(domID);
  }

  addRender(domID) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.BasicDepthPacking;
    document.getElementById(domID).appendChild(this.renderer.domElement);
    this.activeRenderer = this.renderer;
    return this.renderer;
  }

  addShadow() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  addComposer(scene, camera) {
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

  render() {
    if (this.renderer) {
      this.renderer.setAnimationLoop(() => {
        this.activeRenderer.render();
      });
    }
  }
}
