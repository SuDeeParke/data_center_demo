const store = {
  debug: true,
  state: {
    message: 'Hello!',
    acctivePanel: 'Default',
    dark: false,
    shadow: false,
    skyBox: 'bak7',
  },
  setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue);
    }
    if (newValue === '' || newValue === '照明') {
      this.state.acctivePanel = 'Default';
    } else {
      console.log(newValue);
      this.state.acctivePanel = newValue;
    }
    console.log(newValue);
  },
  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered');
    }
    this.state.acctivePanel = 'Default';
  },
};

export default store;
