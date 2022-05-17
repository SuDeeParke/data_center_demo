import BasicObj from './BasicObj';

export default class Floor extends BasicObj {
  constructor() {
    super();
    this.pickable = true;
    return this;
  }
}
