/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-lonely-if */
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
          // 接受阴影
          // eslint-disable-next-line no-param-reassign
          // child.castShadow = true;
          // eslint-disable-next-line no-param-reassign
          // child.receiveShadow = true;
          // 配置拾取
          const objName = childTemp.name;
          // const pattern = /^Obj3d66/;
          if (/^JiGui/.test(objName)) {
            // childTemp.material = childTemp.material.clone();
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

  static refcLoadGltfModle = (addr, option) => new Promise((resolve, reject) => {
    const { pickable, scale, arr } = option;
    const loader = new GLTFLoader();
    // 配置gltf解码器
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('../assets/draco/gltf');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);
    loader.load(addr, (gltf) => {
    // const gltfTemp = gltf;
      const { scene } = gltf;
      if (scale) {
        scene.scale.set(scale, scale, scale);
      }
      if (arr) {
        scene.position.x += arr[0];
        scene.position.y += arr[1];
        scene.position.z += arr[2];
      }
      // 加工处理 pickable
      scene.traverse((child) => {
        const childTemp = child;
        if (childTemp instanceof THREE.Mesh) {
          if (pickable) {
            childTemp.material = childTemp.material.clone();
            childTemp.userData.pickble = true;
            childTemp.userData.scale = scale;
            childTemp.userData.position = arr;
            childTemp.userData.sprite = null;
            childTemp.userData.boxHelper = null;
            childTemp.userData.panel = null;
            childTemp.userData.info = { ...option.info };
            const { type } = childTemp.userData.info;
            if (window.DataCenter && window.DataCenter.lights && type === 'Light') {
              window.DataCenter.lights.push(childTemp);
            }
            if (window.DataCenter && window.DataCenter.cabints && type === 'Cabinet') {
              window.DataCenter.cabints.push(childTemp);
            }
            if (window.DataCenter && window.DataCenter.airs && type === 'AirCondition') {
              window.DataCenter.airs.push(childTemp);
            }
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
    return window.DataCenter.cameraPackge.camera.position.z / maxDiameter;
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
    const objArr = Tools.getAllObject(window.DataCenter.scene.children);
    objArr.forEach((element) => {
      if (uuid === element.uuid) {
        result.push(element);
      }
    });
    return result;
  }

  static showBoxHelper = (obj) => {
    if (obj instanceof THREE.Mesh && !obj.userData.boxHelper) {
      const boxHelper = new THREE.BoxHelper(obj, '#00ffff');
      boxHelper.material.depthTest = false;
      boxHelper.material.linewidth = 10;
      obj.attach(boxHelper);
      // eslint-disable-next-line no-param-reassign
      obj.userData.boxHelper = boxHelper;
      // eslint-disable-next-line no-param-reassign
      obj.userData.boxHelper.userData.test = 'test';
    }
  }

  static hideBoxHelper = (obj) => {
    // window.DataCenter.scene.remove(window.DataCenter.scene.getObjectById(obj.uuid));

    const boxHelps = obj && obj.children.filter((item) => item instanceof THREE.BoxHelper);
    if (boxHelps && boxHelps.length !== 0) {
      boxHelps.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.visible = false;
      });
    }
  }

  static showPanel = (obj, scene) => {
    // 用canvas生成图片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 960;
    // 制作矩形
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, 1280, 960);
    // 设置文字
    ctx.fillStyle = '#222';
    ctx.font = 'normal 100pt "楷体"';
    // 文字换行
    if (obj.userData.info) {
      ctx.fillText(obj.userData.info.id, 150, 200);
      ctx.fillText(obj.userData.info.type, 150, 550);
      ctx.fillText(obj.userData.info.desc, 150, 750);
    }

    // 生成图片
    const url = canvas.toDataURL('image/png');
    const map = new THREE.TextureLoader().load(url);
    const spriteMaterial = new THREE.SpriteMaterial({
      map,
      transparent: false,
    });
    if (!obj.userData.panel) {
      const panel = new THREE.Sprite(spriteMaterial);
      panel.scale.set(4, 4, 4); // 精灵图大小
      panel.translateY(50);
      panel.position.set(
        obj.userData.position[0],
        obj.userData.position[1] + 10,
        obj.userData.position[2],
      );
      // eslint-disable-next-line no-param-reassign
      obj.userData.panel = panel;
      scene.add(panel);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj.userData.panel.visible = true;
    }
  }

  static hidePanel = (obj) => {
    if (obj instanceof THREE.Mesh && obj.userData.panel) {
      obj.userData.panel.visible = false;
    }
  }

  static showMark = (obj, scene) => {
    const url = ('http://localhost:8080/src/img/marker.png');
    const map = new THREE.TextureLoader().load(url);
    const spriteMaterial = new THREE.SpriteMaterial({
      map, // 设置精灵纹理贴图
      transparent: true, // 开启透明(纹理图片png有透明信息)
    });
    if (!obj.userData.sprite) {
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1, 1, 1); // 精灵图大小
      sprite.translateY(50);
      sprite.position.set(obj.userData.position[0], 10, obj.userData.position[2]);
      // eslint-disable-next-line no-param-reassign
      obj.userData.sprite = sprite;
      scene.add(sprite);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj.userData.sprite.visible = true;
    }
  }

  static hideMark = (obj) => {
    if (obj instanceof THREE.Mesh && obj.userData.sprite) {
      obj.userData.sprite.visible = false;
    }
  }

  /**
   * @description 创建天空盒子
   * @param  {} path
   * @param  {} name
   * @param  {} format
   */
  static createSkyBox(path, name, format) {
    // ['px：right', 'nx：left', 'py：up', 'ny：dn', 'pz：back', 'nz：front', ]
    const direction = [
      `${path}/${name}/right.${format}`,
      `${path}/${name}/left.${format}`,
      `${path}/${name}/top.${format}`,
      `${path}/${name}/down.${format}`,
      `${path}/${name}/back.${format}`,
      `${path}/${name}/front.${format}`,
    ];
    const loader = new THREE.TextureLoader();
    // 创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
    const skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
    // 设置盒子材质
    const materialArray = [];
    for (let i = 0; i < 6; i += 1) {
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: loader.load(direction[i]), // 将图片纹理贴上
          side: THREE.BackSide, // 镜像翻转
          fog: false,
        }),
      );
    }
    const mesh = new THREE.Mesh(skyGeometry, materialArray);
    mesh.name = 'skyBox';
    // 创建一个完整的天空盒，填入几何模型和材质的参数
    return mesh;
  }

  /**
   * @description 创建cubeTesture 作为纹理
   * @param  {String} path 文件夹路径
   * @param  {String} name 文件名
   * @param  {String} format 格式
   */
  static createCubeSkybox(path, name, format) {
    const direction = [
      `${path}/${name}/right.${format}`,
      `${path}/${name}/left.${format}`,
      `${path}/${name}/top.${format}`,
      `${path}/${name}/down.${format}`,
      `${path}/${name}/back.${format}`,
      `${path}/${name}/front.${format}`,
    ];
    const textureCube = new THREE.CubeTextureLoader().load(direction);

    // 创建一个完整的天空盒，填入几何模型和材质的参数
    return textureCube;
  }
}
