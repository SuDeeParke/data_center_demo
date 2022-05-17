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
    this.controls = null;
  }

  init(domID) {
    this.scene = this.initScene();
    this.cameraPackge = new BasicCamera();
    this.rendererPackge = new BasicRender();
    document.getElementById(domID).appendChild(this.rendererPackge.renderer.domElement);
    this.controls = this.createControls();
    return this;
  }

  initScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x155461);
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

  createControls() {
    const { renderer } = this.rendererPackge;
    const { camera } = this.cameraPackge;
    if (camera && renderer) {
      const controls = new OrbitControls(camera, renderer.domElement);
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
      return controls;
    }
    return null;
  }

  addModle = async (addr, type) => {
    let obj;
    if (type === 'fbx') {
      obj = Tools.loadFBXModel(addr);
    } else {
      obj = await Tools.loadGltfModle(addr);
    }
    this.scene.add(obj);
    return obj;
  }

  render = () => {
    const { activeRenderer, renderer } = this.rendererPackge;
    const { camera } = this.cameraPackge;
    const { scene, controls } = this;
    if (renderer && activeRenderer) {
      renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
      });
    }
  }
}
