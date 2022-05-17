import BasicObj from './BasicObj';

export default class Building extends BasicObj {
  constructor() {
    super();
    this.pickable = true;
    return this;
  }

  // registerEvent = (eventType) => {
  //   console.log(eventType);
  //   window.addEventListener(eventType, (event) => {
  //     console.log(event);
  //   });
  // }
}
