import {
  configure, observable, action, computed,
} from 'mobx';

configure({ enforceActions: 'observed' });

class RevStore {
  constructor(store) {
    this.store = store;
  }

  @observable state = {};

  @action
  setState = (key, value) => {
    this.state = {
      ...this.state,
      [key]: value,
    };
  }

  @computed get getState() {
    return this.state;
  }
}

export default RevStore;
