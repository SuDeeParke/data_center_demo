/* eslint-disable no-unused-expressions */
/* eslint-disable */
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
    const camera = control.object;
    const copyRotation = camera.rotation.clone();
    control.target = point;
    camera.rotation.order = 'XYZ'
    // eslint-disable-next-line no-param-reassign
    control && (control.enabled = false);
    new TWEEN.Tween(camera.position)
      .to(new Vector3(point.x + 1, point.y + 1, point.z + 1))
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((v) => {
        camera.position.set(v.x, v.y, v.z);
      }, 3000)
      .onComplete(() => {
        // eslint-disable-next-line no-param-reassign
        control && (control.enabled = true);
        // control.autoRotate = true;
        control.update()
      })
      .start();
    Tools.animate();
  }
}
