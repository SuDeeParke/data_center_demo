import { PerspectiveCamera } from 'three';

export default class BasicCamera {
  constructor() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(60, aspectRatio, 1, 10000);
    this.camera.position.z = 5;
  }
}
