import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { GLTFLoader } from '@/assets/js/GLTFLoader';
import { DRACOLoader } from '@/assets/js/DRACOLoader';
import { FBXLoader } from '@/assets/js/FBXLoader';

export default class Tools {
  static animate(time) {
    requestAnimationFrame(Tools.animate);
    TWEEN.update(time);
  }

  static loadFBXModel = (scene, addr) => {
    const loader = new FBXLoader();
    loader.load(addr, (fbx) => {
      const fbxGroup = fbx;
      fbxGroup.scale.x = 0.001;
      fbxGroup.scale.y = 0.001;
      fbxGroup.scale.z = 0.001;
      return fbxGroup;
    }, undefined, (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  /**
   * @description 加载GLTF模型
   * @param  {Object3D} scene
   * @param  {String} addr
   */
  // eslint-disable-next-line no-unused-vars
  static loadGltfModle = (addr) => new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    // 配置gltf解码器
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('../assets/draco/gltf');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);
    loader.load(addr, (gltf) => {
    // const gltfTemp = gltf;
      const { scene } = gltf;
      // scene.scale.set(scale, scale, scale);
      Tools.setScaleToFitSize(scene);
      // 加工处理 pickable
      scene.traverse((child) => {
        const childTemp = child;
        if (childTemp instanceof THREE.Mesh) {
          const objName = childTemp.name;
          // 接受阴影
          // eslint-disable-next-line no-param-reassign
          // child.castShadow = true;
          // eslint-disable-next-line no-param-reassign
          // child.receiveShadow = true;
          // 配置拾取
          // const pattern = /^Obj3d66/;
          if (/^JiGui/.test(objName)) {
            childTemp.material = childTemp.material.clone();
            childTemp.userData.pickble = true;
          } else {
            childTemp.userData.pickble = false;
          }
        }
      });
      resolve(scene);
    }, undefined, (error) => {
    // eslint-disable-next-line no-console
      console.error(error);
      reject(error);
    });
  })

  // 获取模型适合观察的缩放的比例
  static getFitScaleValue = (obj) => {
    const boxHelper = new THREE.BoxHelper(obj);
    boxHelper.geometry.computeBoundingBox();
    const box = boxHelper.geometry.boundingBox;
    const maxDiameter = Math.max(
      (box.max.x - box.min.x),
      (box.max.y - box.min.y),
      (box.max.z - box.min.z),
    );
    return window.scene.cameraPackge.camera.position.z / maxDiameter;
  }

  // 设置模型到适合观察的大小
  static setScaleToFitSize= (obj) => {
    const scaleValue = this.getFitScaleValue(obj);
    obj.scale.set(scaleValue, scaleValue, scaleValue);
    return scaleValue;
  }

  static onWindowResize = (basicScene) => {
    const basic = basicScene;
    basic.camera.aspect = window.innerWidth / window.innerHeight;
    basic.camera.updateProjectionMatrix();
    basic.renderer.setSize(window.innerWidth, window.innerHeight);
    basic.render();
  }

  static getAllObject = (objs) => {
    const objArr = [];
    // const objs = window.basicScene.scene.children;
    objs.forEach((element) => {
      if (element instanceof THREE.Mesh) {
        objArr.push(element);
      } else if (element instanceof THREE.Group) {
        objArr.push(...Tools.getAllObject(element.children));
      } else if (element instanceof THREE.Object3D) {
        if (element.children.length !== 0) {
          objArr.push(...Tools.getAllObject(element.children));
        }
      }
    });
    return objArr;
  }

  static queryObject = (uuid) => {
    const result = [];
    const objArr = Tools.getAllObject(window.scene.scene.children);
    objArr.forEach((element) => {
      if (uuid === element.uuid) {
        result.push(element);
      }
    });
    return result;
  }

  static showBoxHelper = (obj) => {
    const boxHelps = obj && obj.children.filter((item) => item instanceof THREE.BoxHelper);
    if (boxHelps && boxHelps.length === 0) {
      const boxHelp = new THREE.BoxHelper(obj, '#00ffff');
      boxHelp.material.depthTest = false;
      boxHelp.material.linewidth = 10;
      obj.attach(boxHelp);
    } else {
      boxHelps.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.visible = true;
      });
    }
  }

  static hideBoxHelper = (obj) => {
    const boxHelps = obj && obj.children.filter((item) => item instanceof THREE.BoxHelper);
    if (boxHelps && boxHelps.length !== 0) {
      boxHelps.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.visible = false;
      });
    }
  }
}
