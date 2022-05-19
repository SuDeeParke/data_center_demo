const store = {
  debug: true,
  state: {
    message: 'Hello!',
    acctivePanel: 'Default',
  },
  setMessageAction(newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue);
    if (newValue === '' || newValue === '照明') { this.state.acctivePanel = 'Default'; } else {
      this.state.acctivePanel = newValue;
    }
  },
  clearMessageAction() {
    if (this.debug) console.log('clearMessageAction triggered');
    this.state.acctivePanel = 'Default';
  },
};

export default store;
