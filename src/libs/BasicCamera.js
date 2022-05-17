import * as THREE from 'three';
import Basic from './Basic';

export default class BasicCamera extends Basic {
  constructor() {
    super();
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 10000);
    this.camera.position.z = 5;
  }
}
