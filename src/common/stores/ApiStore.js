import axios from 'axios';
import { ApiConst } from '~/common/constants';
import { storageToken } from '~/common/utils';

export default class ApiStore {
  constructor() {
    this.restInstance = axios.create({
      baseURL: ApiConst.RESTFUL_URI,
    });
    this.restInstance.defaults.headers.common.accept = 'application/json';
    this.restInstance.defaults.headers.common['Content-Type'] = 'application/json';

    this.restInstance.defaults.timeout = 600000;

    this.progress = 0;
    this.timerId = null;

    this.restInstance.interceptors.request.use((config) => {
      this.setProgress(0);
      this.timer();
      return config;
    }, (error) => Promise.reject(error));

    this.restInstance.interceptors.response.use((response) => {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.setProgress(100);
      return response;
    }, (error) => Promise.reject(error));
  }

  setProgress(value) {
    this.progress = value;
    window.progressbar.onChange(this.progress);
  }

  timer() {
    if (this.progress < 98) {
      const diff = 100 - this.progress;
      const inc = diff / (10 + this.progress * (1 + this.progress / 100));
      this.setProgress(this.progress + inc);
    }
    this.timmerId = setTimeout(this.timer, 50);
  }

  getAxios = (isRequireToken) => {
    if (isRequireToken) {
      this.restInstance.defaults.headers.common.Authorization = `Bearer ${
        storageToken().access_token
      }`;
    } else {
      delete this.restInstance.defaults.headers.common.Authorization;
    }
    return this.restInstance;
  }
}
