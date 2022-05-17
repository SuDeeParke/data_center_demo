import { SkeletonHelper } from 'three';

export default class BasicObj {
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

  complete = (func) => func()
}
