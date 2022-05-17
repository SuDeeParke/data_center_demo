import BasicObj from './BasicObj';

export default class Device extends BasicObj {
  constructor() {
    super();
    this.pickable = true;
    return this;
  }
}
