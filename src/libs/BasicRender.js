import * as THREE from 'three';
import { EffectComposer } from '@/assets/js/postprocessing/EffectComposer';
import { RenderPass } from '@/assets/js/postprocessing/RenderPass';
import { OutlinePass } from '@/assets/js/postprocessing/OutlinePass';
import { ShaderPass } from '@/assets/js/postprocessing/ShaderPass';
import { FXAAShader } from '@/assets/js/postprocessing/FXAAShader';

export default class BasicRender {
  constructor(scene, camera) {
    this.renderer = null;
    this.composer = null;
    this.activeRenderer = null;
    this.outlinePass = null;
    this.effectFXAA = null;
    this.renderer = this.createRender();
    this.composer = this.createComposer(scene, camera);
  }

  createRender = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.BasicDepthPacking;
    this.activeRenderer = renderer;
    return renderer;
  }

  addShadow() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  createComposer(scene, camera) {
    this.composer = new EffectComposer(this.renderer);
    if (this.scene && this.camera) {
      const renderPass = new RenderPass(scene, camera);
      this.composer.addPass(renderPass);
      this.addOutlineEffect();
      // this.addFXAAEffect();
    }
    this.activeRenderer = this.composer;
    return this.composer;
  }

  addFXAAEffect() {
    this.effectFXAA = new ShaderPass(FXAAShader);
    this.effectFXAA.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight,
    );
    this.composer.addPass(this.effectFXAA);
  }

  addOutlineEffect() {
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera,
    );
    // 轮廓宽度
    this.outlinePass.edgeStrength = 2;
    // 发光
    this.outlinePass.edgeGlow = 1;
    // 虚化
    this.outlinePass.edgeThickness = 1;
    // 没有被遮挡的颜色
    this.outlinePass.visibleEdgeColor.set('#ffca28');
    // 被遮挡部分的颜色
    this.outlinePass.hiddenEdgeColor.set('#ffffff');
    // 是否使用父级的材质
    this.outlinePass.usePatternTexture = false;
    // 边框弯曲度
    this.outlinePass.downSampleRatio = 2;
    // 鼠标移开之后是否清除
    this.outlinePass.clear = true;
    this.composer.addPass(this.outlinePass);
  }
}
