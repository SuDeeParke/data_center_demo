/* eslint-disable no-unused-expressions */
import * as THREE from 'three';
import { OrbitControls } from '@/assets/js/OrbitControls';
import Stats from '@/assets/js/stats.module';
import BasicCamera from './BasicCamera';
import BasicRender from './BasicRender';
import Tools from './Tools';

export default class Basic {
  constructor() {
    this.scene = null;
    this.cameraPackge = null;
    this.rendererPackge = null;
    this.controls = null;
    this.raycaster = null;
    this.pointer = null;
    this.selectedObjects = [];
    this.selectedObject = null;
    this.beforeSelObj = {
      uuid: undefined,
      color: undefined,
    };
    this.state = null;
    process.env.VUE_APP_DEV === 'true' ? window.THREE = THREE : null;
  }

  init(domID) {
    return new Promise((resolve) => {
      this.scene = this.initScene();
      this.cameraPackge = new BasicCamera();
      this.rendererPackge = new BasicRender(this.scene, this.cameraPackge.renderer);
      document.getElementById(domID).appendChild(this.rendererPackge.renderer.domElement);
      this.controls = this.createControls();
      this.addPicker();
      process.env.VUE_APP_DEV === 'true' ? this.createState() : null;
      resolve(this);
    });
  }

  initScene = () => {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x155461);
    scene.add(Tools.createSkyBox('models/texture/bak7', '', 'jpg'));
    // 灯光
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(20, 20, 20);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xf5f5f5);
    scene.add(ambientLight);
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

  addPicker() {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  updatePointer(event) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  addSelectedObject(object) {
    this.selectedObjects = [];
    this.selectedObjects.push(object);
  }

  handlePick() {
    const curObj = this.selectedObject.object;
    console.log(this.selectedObject.object);
    if (curObj && curObj.userData.pickble) {
      if (this.beforeSelObj) {
        // 恢复原来的颜色
        Tools.queryObject(this.beforeSelObj.uuid).forEach((element) => {
        // eslint-disable-next-line no-param-reassign
          element.material.color = this.beforeSelObj.color;
        });
      }
      if (this.beforeSelObj && this.beforeSelObj.uuid !== curObj.uuid) {
        const { x, y, z } = this.selectedObject.point;
        const point = { x: x + 3, y: y + 3, z: z + 3 };
        this.cameraPackge.cameraFlyTo(this.controls, point);
      }
      // 克隆当前的颜色
      this.beforeSelObj = {
        uuid: curObj.uuid,
        color: curObj.material.color.clone(),
      };
      // 设置选中颜色
      curObj.material.color.set(0x00ffff);
    }
  }

  checkIntersection() {
    const { camera } = this.cameraPackge;
    this.raycaster.setFromCamera(this.pointer, camera);
    const intersects = this.raycaster.intersectObject(this.scene, true);
    if (intersects.length > 0) {
      [this.selectedObject] = intersects;
      // 先取消hover的目标
      Tools.hideBoxHelper(this.selectedObjects[0]);
      // 再替换
      this.addSelectedObject(this.selectedObject.object);
      if (this.selectedObject.object.userData.pickble) {
        // const { outlinePass } = this.rendererPackge;
        // this.outlinePass.selectedObjects = this.selectedObjects;
        // Tools.showBoxHelper(this.selectedObject.object);
        Tools.showPanel(this.selectedObject.object, this.scene);
      }
    }
  }

  createState() {
    const state = new Stats();
    const div = document.createElement('div');
    div.appendChild(state.dom);
    document.body.appendChild(div);
    this.state = state;
  }

  render = () => {
    const { activeRenderer, renderer } = this.rendererPackge;
    const { camera } = this.cameraPackge;
    const { scene, controls, state } = this;
    if (renderer && activeRenderer) {
      renderer.setAnimationLoop(() => {
        state && state.begin();
        controls.update();
        renderer.render(scene, camera);
        state && state.end();
      });
    }
  }
}
