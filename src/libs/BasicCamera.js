/* eslint-disable no-unused-expressions */
import { PerspectiveCamera, Vector3 } from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Tools from './Tools';

export default class BasicCamera {
  constructor(type) {
    this.camera = null;
    if (type === 'OrthographicCamera') {
      this.camera = this.orthoCam();
      return this.camera;
    }
    this.persCam();
    return this;
  }

  persCam = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(60, aspectRatio, 1, 10000);
    this.cameraSetPosition([50, 50, 50]);
    return this.camera;
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
    // const cloneCamera = this.camera.clone();
    // this.camera.lookAt(point);
    // eslint-disable-next-line no-param-reassign
    control.target = new Vector3(point.x, point.y, point.z);
    controlTemp && (controlTemp.enabled = false);
    new TWEEN.Tween(this.camera.position)
      .to({
        x: point.x,
        y: point.y,
        z: point.z,
      })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((v) => {
        this.camera.position.x = v.x;
        this.camera.position.y = v.y;
        this.camera.position.z = v.z;
      }, 1000)
      .onComplete(() => {
        controlTemp && (controlTemp.enabled = true);
      })
      .start();
    Tools.animate();
  }
}
