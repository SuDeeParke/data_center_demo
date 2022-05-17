import BasicObj from './BasicObj';

export default class Building extends BasicObj {
  constructor() {
    super();
    this.pickable = true;
    return this;
  }
}
