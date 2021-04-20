import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/feather/edit';

import { CustomCKEditor } from '~/common/components';
import { parseQuery, stringQuery } from '~/common/utils';
import Button from '~/material-kit/CustomButtons/Button';

import { HisList } from './modules';
import contentStyle from './styles/contentStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  cont: stores.contStore,
  attach: stores.attachStore,
}))
@withRouter
@withStyles(contentStyle)
@observer
class Content extends React.Component {
  componentDidMount() {
    const {
      cont, match, history, attach,
    } = this.props;
    const qparams = parseQuery(history.location.search);

    attach.setAttachInfo({
      tblnm: 'hrpj_cont',
      editoryn: 'Y',
      tblkey: qparams.rid,
    });

    attach.apiAttachList({
      tblnm: 'hrpj_cont',
      tblkey: qparams.rid,
      editoryn: 'Y',
    });

    const contParams = {
      menucd: qparams.rid,
      ordercol: 'contid',
      ordertype: 'desc',
      limit: 1,
      ...match.params,
    };
    if (qparams.contid) {
      contParams.contid = qparams.contid;
    }
    cont.apiContInfo(contParams);

    cont.apiContList({
      menucd: qparams.rid,
      currentPageNo: qparams.currentPageNo || 1,
      itemsPerPage: qparams.itemsPerPage || 30,
      ordercol: 'contid',
      ordertype: 'desc',
    });
  }

  onChange = (evt) => {
    const { cont } = this.props;
    cont.setContInfoByKey('cont', evt.editor.getData());
  }

  historyClick = (contid) => () => {
    const { history } = this.props;
    const qparams = parseQuery(history.location.search);
    qparams.contid = contid;
    const pgUrl = `${history.location.pathname}?${stringQuery(qparams)}`;
    history.replace(pgUrl);
  }

  apiContIns = async () => {
    const { cont, history } = this.props;
    const contid = await cont.apiContIns({
      menucd: cont.getContInfo.menucd,
      cont: cont.getContInfo.cont,
    });

    const qparams = parseQuery(history.location.search);
    qparams.contid = contid;
    const pgUrl = `${history.location.pathname}?${stringQuery(qparams)}`;
    history.replace(pgUrl);
  }

  updateAttach = () => () => {
  }

  render() {
    const {
      classes, history, menu, attach, cont: { getContInfo, getContList },
    } = this.props;
    const qparams = parseQuery(history.location.search);
    const menuArr = menu.getAdmMenuTree;
    const currtMenu = menu.admFindActiveMenu(menuArr, qparams.menucd);
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        {currtMenu && (
          <h4 className={classes.pageTitle}>{currtMenu.menunm}</h4>
        )}
        <div className={classes.contWrap}>
          <div className={classes.contLeft}>
            <h5 className={classes.hisTitle}>History List</h5>
            <div className={classes.contHisWrap}>
              <HisList
                listItem={getContList}
                listKey={currtMenu && currtMenu.menucd}
                onClick={this.historyClick}
                curtContid={qparams.contid}
              />
            </div>
            <Button
              color="primary"
              onClick={this.apiContIns}
              className={classes.contBtn}
            >
              <Icon icon={edit} /> 컨텐츠 반영
            </Button>
          </div>
          <div className={classes.contRight}>
            <CustomCKEditor
              id="cont"
              attach={attach}
              data={getContInfo}
              onChange={this.onChange}
              config={{
                height: '600',
                contentsCss: ['/css/contentStyle.css', '/font-awesome/css/all.min.css'],
              }}
              imgview
              attachEditorList={attach.getAttachEditorList}
              filethumb={this.updateAttach}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
