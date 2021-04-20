import React from 'react';
import _ from 'lodash';
import {
  observable, action, configure, flow, computed, toJS,
} from 'mobx';
import { asyncAction } from 'mobx-utils';
import { ReactConst, FrontDefRoutes, AdminDefRoutes } from '~/common/constants';

configure({ enforceActions: 'observed' });

class MenuStore {
  constructor(store) {
    this.store = store;
    this.prefixPath = '/menu';
    this.reactConst = ReactConst;
  }

  @observable menuActive = false;

  @observable menuTree = [];

  @observable menuRoutes = [];

  @observable admMenuTree = [];

  @observable admMenuRoutes = [];

  @observable subMenuRoutes = [];

  @observable activePath = '';

  @observable loading = true;

  @action setMenuTree = (menuTree) => { this.menuTree = menuTree; }

  @action setMenuRoutes = (menuRoutes) => { this.menuRoutes = menuRoutes; }

  @action setAdmMenuTree = (admMenuTree) => { this.admMenuTree = admMenuTree; }

  @action setAdmMenuRoutes = (admMenuRoutes) => { this.admMenuRoutes = admMenuRoutes; }

  @action setSubMenuRoutes = (subMenuRoutes) => { this.subMenuRoutes = subMenuRoutes; }

  @action setMenuActive = (menuActive) => { this.menuActive = menuActive; }

  @action setActivePath = (activePath) => { this.activePath = activePath; }

  @action setLoading = (loading) => { this.loading = loading; }

  @computed get getMenuTree() {
    return toJS(this.menuTree);
  }

  @computed get getMenuRoutes() {
    return toJS(this.menuRoutes);
  }

  @computed get getAdmMenuTree() {
    return toJS(this.admMenuTree);
  }

  @computed get getAdmMenuRoutes() {
    return toJS(this.admMenuRoutes);
  }

  @computed get getSubMenuRoutes() {
    return toJS(this.subMenuRoutes);
  }

  @computed get getMenuActive() {
    const _menuTree = this.getMenuTree;
    const _currtMenu = _menuTree.filter((item) => item.upath === this.menuActive)[0] || {};
    return _currtMenu.cupath || _currtMenu.upath || false;
  }

  @computed get getMenuInfo() {
    const _menuTree = this.getMenuTree;
    const _currtMenu = this.findActiveMenu(_menuTree);
    return _currtMenu;
  }

  @computed get getActivePath() {
    return toJS(this.activePath);
  }

  @computed get isLoading() {
    return toJS(this.loading);
  }

  findActiveMenu = (menuArr, parent) => {
    let tmpActivePath = this.activePath.split('/');
    if (tmpActivePath.length > 3) {
      tmpActivePath = tmpActivePath.splice(0, 3);
    }
    tmpActivePath = tmpActivePath.join('/');

    let currtItem;
    menuArr.some((item) => {
      if (parent) {
        Object.assign(item, {
          parent,
        });
      }
      if (item.upath === tmpActivePath) {
        currtItem = item;
        return true;
      }
      if (item.children && item.children.length > 0) {
        const currtItemSub = this.findActiveMenu(item.children, item);
        if (currtItemSub) {
          currtItem = currtItemSub;
          return true;
        }
      }
      return false;
    });

    if (tmpActivePath === '/') {
      currtItem = {};
    }

    return currtItem;
  }

  getIconImport = flow(function* getIconImport(item) {
    if (item.icon) {
      const iconReq = yield import(`react-icons-kit/feather/${item.icon}`);
      return iconReq[item.icon];
    }
    return '';
  })

  setRouteMenu = flow(function* setRouteMenu(menuTree) {
    const rt = yield menuTree.map((item) => {
      if (_.startsWith(item.sgrp, 'AA')) {
        if (item.cpath) {
          return ({
            menucd: item.menucd,
            path: `/sysadm${item.upath}`,
            exact: (item.exact !== 'Y'),
            component: React.lazy(() => Promise.all([
                import(`../../pages/sysadm/${item.cpath}/${item.cpath}Container`),
                new Promise((resolve) => setTimeout(resolve, 300)),
            ]).then(([moduleExports]) => moduleExports)),
            auth: 'role_admin',
          });
        }
        return ({
          menucd: item.menucd,
          path: `/sysadm${item.upath}`,
          exact: true,
          component: React.lazy(() => Promise.all([
            import('~/pages/sysadm/Main/MainContainer'),
            new Promise((resolve) => setTimeout(resolve, 300)),
          ]).then(([moduleExports]) => moduleExports)),
          auth: 'role_admin',
        });
      }

      if (item.cpath) {
        return ({
          menucd: item.menucd,
          path: `${item.upath}${item.exact === 'Y' ? '/:subpath' : ''}`,
          exact: (item.exact !== 'Y'),
          component: React.lazy(() => Promise.all([
                  import(`../../pages/${item.cpath}/${item.cpath}Container`),
                  new Promise((resolve) => setTimeout(resolve, 300)),
          ]).then(([moduleExports]) => moduleExports)),
          auth: item.rolecd,
        });
      }
      return ({
        menucd: item.menucd,
        path: item.upath,
        exact: true,
        component: React.lazy(() => Promise.all([
              import('~/pages/Main/MainContainer'),
              new Promise((resolve) => setTimeout(resolve, 300)),
        ]).then(([moduleExports]) => moduleExports)),
      });
    });

    if (_.startsWith(menuTree[0].sgrp, 'AA')) {
      return AdminDefRoutes.concat(rt);
    }
    return FrontDefRoutes.concat(rt);
  })

  itemSetIconArr = flow(function* itemSetIconArr(_self, item) {
    return yield item.children.map(flow(function* setIconSvgItem(citem) {
      const icon = yield _self.getIconImport(citem);

      if (_.startsWith(citem.sgrp, 'AA')) {
        const retList = yield _self.apiSelectMenuList({
          mtype: citem.mtype,
          sgrp: 'SS0',
          useyn: 'Y',
        });

        Object.assign(citem, {
          iconSvg: icon,
          children: retList.selectMenu,
        });
      } else {
        Object.assign(citem, {
          iconSvg: icon,
        });
      }

      if (citem.children && citem.children.length > 0) {
        const subChild = yield _self.itemSetIconArr(_self, citem);
        yield Promise.all(subChild).then((scItem) => {
          Object.assign(citem, {
            children: scItem,
            cupath: scItem[0].upath,
            cmenucd: scItem[0].menucd,
          });
        });
      }

      return citem;
    }));
  })

  findSubMenuRouter = flow(function* findSubMenuRouter(rootItem) {
    const menuRoute = yield this.setRouteMenu(rootItem.children);
    this.setSubMenuRoutes(menuRoute);
  })

  apiSelectMenu = flow(function* apiSelectMenu(sgrp) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectMenuTree`, {
      params: {
        sgrp,
        useyn: 'Y',
      },
    });
    const { selectMenuTree } = apiData.data.resMap;
    const _self = this;
    if (selectMenuTree) {
      selectMenuTree.forEach(flow(function* setMenuData(item) {
        if (item.menucd.indexOf('00') > -1) {
          const menuRoute = yield _self.setRouteMenu(item.children);
          const menuTree = yield _self.itemSetIconArr(_self, item);
          yield Promise.all(menuTree).then((treeItem) => {
            if (_.startsWith(sgrp, 'AA')) {
              _self.setAdmMenuTree(treeItem);
              _self.setAdmMenuRoutes(menuRoute);
            } else {
              _self.setMenuTree(treeItem);
              _self.setMenuRoutes(menuRoute);
            }
          });
        }
      }));
    }
  })

  @asyncAction
  async* apiSelectMenuList(params) {
    const { apiStore: { getAxios } } = this.store;
    const apiData = yield getAxios().get(`${this.prefixPath}/selectMenu`, {
      params,
    });

    const { resMap } = apiData.data;
    this.memberState = true;
    return resMap || {};
  }

  @action
  admFindActiveMenu = (menuArr, menucd, parent) => {
    let currtItem;
    menuArr.some((item) => {
      if (parent) {
        Object.assign(item, {
          parent,
        });
      }
      if (item.menucd === menucd) {
        currtItem = item;
        return true;
      }
      if (item.children && item.children.length > 0) {
        const currtItemSub = this.admFindActiveMenu(item.children, menucd, item);
        if (currtItemSub) {
          currtItem = currtItemSub;
          return true;
        }
      }
      return false;
    });

    return currtItem;
  }
}

export default MenuStore;
