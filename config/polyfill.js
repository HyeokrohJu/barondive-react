/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-proto */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-inner-declarations */
import 'react-app-polyfill/ie9';
import 'raf';

(function () {
  const _exclude = ['length', 'name', 'arguments', 'caller', 'prototype'];

  function bindFunction(ctx, fn) {
    return function () {
      return fn.apply(this, arguments);
    };
  }

  function bindProperty(ctx, prop, parentDescriptor) {
    if (!parentDescriptor) {
      const defaultValue = ctx.__proto__[prop];
      parentDescriptor = {
        get() {
          return ctx[`__${prop}`] || defaultValue;
        },
        set(val) {
          ctx[`__${prop}`] = val;
        },
      };
    }
    Object.defineProperty(ctx, prop, {
      get: parentDescriptor.get ? parentDescriptor.get.bind(ctx) : undefined,
      set: parentDescriptor.set ? parentDescriptor.set.bind(ctx) : undefined,
      configurable: true,
    });
  }

  function iterateProps(subClass, superClass) {
    const props = Object.getOwnPropertyNames(superClass);
    let proto;

    subClass.__proto__ = superClass;
    for (let i = 0, len = props.length; i < len; i++) {
      const prop = props[i];
      if (prop === '__proto__') {
        proto = superClass[prop];
      } else if (_exclude.indexOf(i) === -1) {
        const descriptor = Object.getOwnPropertyDescriptor(subClass, prop);
        if (!descriptor) {
          const superDescriptor = Object.getOwnPropertyDescriptor(
            superClass,
            prop,
          );
          if (
            typeof superDescriptor.get !== 'function'
              && typeof superClass[prop] === 'function'
          ) {
            subClass[prop] = bindFunction(subClass, superClass[prop]);
          } else if (typeof superDescriptor.get === 'function') {
            bindProperty(subClass, prop, superDescriptor);
          } else {
            bindProperty(subClass, prop);
          }
        }
      }
    }
    if (proto) {
      iterateProps(subClass, proto);
    }
  }
  if (
    typeof Object.setPrototypeOf === 'undefined'
    && typeof Object.getOwnPropertyNames === 'function'
  ) {
    Object.setPrototypeOf = iterateProps;
  }
}());

(function () {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`]
      || window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());
