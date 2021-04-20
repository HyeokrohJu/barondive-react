import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ReactHtmlParser from 'react-html-parser';
import { withStyles } from '@material-ui/core/styles';

import {
  ContPr, NavSubPr, HeaderPr, CusHelmet,
} from '~/common/components';
import { ReactConst } from '~/common/constants';
import * as hrbg1 from '~/assets/img/main05.jpg';

import contentStyle from './styles/contentStyle';
import '~/assets/css/contentStyle.css';
import './font-awesome/css/all.min.css';

@inject((stores) => ({
  menu: stores.menuStore,
  cont: stores.contStore,
}))
@withRouter
@withStyles(contentStyle)
@observer
class Content extends React.Component {
  componentDidMount() {
    const { menu, cont, match } = this.props;

    cont.apiContInfo({
      menucd: menu.getMenuInfo.menucd,
      ordercol: 'contid',
      ordertype: 'desc',
      limit: 1,
      ...match.params,
    });
  }

  render() {
    const { classes, menu, cont } = this.props;
    const menuInfo = menu.getMenuInfo;
    const contInfo = cont.getContInfo;
    let contTxt = contInfo.cont && contInfo.cont.replace(/(<([^>]+)>)/ig, '');
    if (contTxt && contTxt.length > 150) {
      contTxt = contTxt && `${ReactHtmlParser(contTxt)[0].substring(0, 150).replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '')}...`;
    } else {
      contTxt = contTxt && ReactHtmlParser(contTxt)[0].replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
    }

    return (
      <>
        <CusHelmet
          title={menuInfo.menunm}
          type="article"
          description={contTxt}
          url={`${ReactConst.DOMAIN}${menuInfo.upath}`}
          publishedTiem={moment(contInfo.credate).format('YYYY-MM-DDTHH:mm:ssZ')}
          modifiedTiem={moment(contInfo.upddate).format('YYYY-MM-DDTHH:mm:ssZ')}
        />
        <HeaderPr bgimg={hrbg1} {...this.props} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          {menu.getMenuInfo.parent.children.length > 0 && (<NavSubPr {...this.props} />)}
          <ContPr menucd={menu.getMenuInfo.menucd} {...this.props} />
        </div>
      </>
    );
  }
}

export default Content;
