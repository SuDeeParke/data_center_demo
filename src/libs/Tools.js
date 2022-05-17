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
  static loadGltfModle = (addr) => {
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
      console.log(scene);
      return scene;
    }, undefined, (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }
}
