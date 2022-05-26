/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { EffectComposer } from '@/assets/js/postprocessing/EffectComposer';
import { RenderPass } from '@/assets/js/postprocessing/RenderPass';
import { OutlinePass } from '@/assets/js/postprocessing/OutlinePass';
import { ShaderPass } from '@/assets/js/postprocessing/ShaderPass';
import { FXAAShader } from '@/assets/js/postprocessing/FXAAShader';

export default class BasicRender {
  constructor(scene, camera, shadow) {
    this.renderer = null;
    this.composer = null;
    this.activeRenderer = null;
    this.outlinePass = null;
    this.effectFXAA = null;
    this.outlinePass = this.addOutlineEffect(scene, camera);
    this.renderer = this.createRender(shadow);
    this.composer = this.createComposer(scene, camera);
  }

  createRender = (shadow) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = shadow;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.BasicDepthPacking;
    this.activeRenderer = renderer;
    return renderer;
  }

  createComposer(scene, camera) {
    this.composer = new EffectComposer(this.renderer);
    if (scene && camera) {
      const renderPass = new RenderPass(scene, camera);
      this.composer.addPass(renderPass);
      // this.addOutlineEffect(scene, camera);
      // this.addFXAAEffect();
      this.composer.addPass(this.outlinePass);
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

  addOutlineEffect = (scene, camera) => {
    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera,
    );
    // 轮廓宽度
    outlinePass.edgeStrength = 2;
    // 发光
    outlinePass.edgeGlow = 1;
    // 虚化
    outlinePass.edgeThickness = 1;
    // 没有被遮挡的颜色
    outlinePass.visibleEdgeColor.set('#0x00ffff');
    // 被遮挡部分的颜色
    outlinePass.hiddenEdgeColor.set('#ffffff');
    // 是否使用父级的材质
    outlinePass.usePatternTexture = false;
    // 边框弯曲度
    outlinePass.downSampleRatio = 2;
    // 鼠标移开之后是否清除
    outlinePass.clear = true;
    // this.composer.addPass(outlinePass);
    // this.outlinePass = outlinePass;
    return outlinePass;
  }
}
