import { SkeletonHelper } from 'three';
import Tools from './Tools';

export default class BasicObj {
  constructor() {
    this.obj3d = null;
    this.parentLevel = null;
    this.subLevel = [];
    this.pickable = false;
  }

  init = async (scene, addr) => {
    await Tools.loadGltfModle(addr).then((res) => {
      this.obj3d = res;
      scene.add(res);
    });
  }

  getCore() {
    return this.core;
  }

  addOutLine() {
    const helper = new SkeletonHelper(this.core);
    this.parent.add(helper);
  }

  /**
   * @description 设置物体偏移量
   * @param  {Array} arr [x,y,z]
   */
  setOffset = (arr) => {
    if (this.core) {
      const mesh = this.core;
      switch (arr.length) {
        case 3:
          mesh.position.x += arr[0];
          mesh.position.y += arr[1];
          mesh.position.z += arr[2];
          break;
        case 2:
          mesh.position.x += arr[0];
          mesh.position.y += arr[1];
          break;
        default:
          break;
      }
      return this;
    }
    return null;
  }

  addParent(basicObj) {
    this.parentLevel = basicObj;
  }

  addSubLevel(basicObj) {
    this.subLevel.push(basicObj);
  }

  complete = (func) => func()
}
