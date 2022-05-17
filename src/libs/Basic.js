import * as THREE from 'three';
import { OrbitControls } from '@/assets/js/OrbitControls';
import BasicCamera from './BasicCamera';
import BasicRender from './BasicRender';
import Tools from './Tools';

export default class Basic {
  constructor() {
    this.scene = null;
    this.cameraPackge = null;
    this.rendererPackge = null;
  }

  init(domID) {
    this.scene = this.initScene();
    this.cameraPackge = new BasicCamera();
    this.rendererPackge = new BasicRender(domID);
    this.addControls();
    return this;
  }

  initScene = () => {
    const scene = new THREE.Scene();
    // 灯光
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(20, 20, 20);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);
    // eslint-disable-next-line no-unused-expressions
    process.env.VUE_APP_DEV === 'true' ? console.log('测试模式场景初始化完成！') : console.log('欢迎来到数据中心可视化系统！');
    return scene;
  }

  addControls() {
    const { renderer } = this.rendererPackge;
    if (this.camera && renderer) {
      const controls = new OrbitControls(this.camera, renderer.domElement);
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

  addModle = (addr, type) => {
    let obj;
    if (type === 'fbx') {
      obj = Tools.loadFBXModel(addr);
    } else {
      obj = Tools.loadGltfModle(addr);
    }
    console.log(obj);
    // this.scene.add(obj);
    return obj;
  }

  render = () => {
    const { activeRenderer, renderer } = this.rendererPackge;
    if (renderer && activeRenderer) {
      renderer.setAnimationLoop(() => {
        // eslint-disable-next-line no-unused-expressions
        this.controls && this.controls.update();
        activeRenderer.render();
      });
    }
  }
}
