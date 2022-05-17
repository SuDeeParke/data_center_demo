import { PerspectiveCamera } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Tools from './Tools';

export default class BasicCamera {
  constructor(type) {
    this.camera = null;
    if (type === 'OrthographicCamera') {
      this.camera = this.orthoCam();
      return this.camera;
    }
    this.camera = this.persCam();
    return this.camera;
  }

  persCam = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera(60, aspectRatio, 1, 10000);
    camera.position.z = 5;
    return camera;
  }

  orthoCam = () => 'orthoCam to be continue...'

  cameraSetPosition = (arr) => {
    if (this.camera && arr) {
      this.camera.position.set(arr[0], arr[1], arr[2]);
    }
    return this.camera;
  }

  cameraFlyTo = (control, point) => {
    const controlTemp = control;
    const cloneCamera = this.camera.clone();
    this.camera.lookAt(point);
    controlTemp.enabled = false;
    new TWEEN.Tween(this.camera.position)
      .to(point)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((v) => {
        this.camera.position.x = v.x;
        this.camera.position.y = v.y;
        this.camera.position.z = v.z;
      }, 1000)
      .onComplete(() => {
        controlTemp.enabled = true;
      })
      .start();
    new TWEEN.Tween(this.camera.rotation)
      .to({ x: cloneCamera.rotation.x, y: cloneCamera.rotation.y, z: cloneCamera.rotation.z }, 1000)
      .easing(TWEEN.Easing.Back.Out).start();
    Tools.animate();
    return this.camera;
  }
}
