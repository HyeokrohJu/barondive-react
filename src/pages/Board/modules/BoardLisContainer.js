import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { ListTypeBltPr, PhotoTypeBltPr, CusHelmet } from '~/common/components';
import { ReactConst } from '~/common/constants';
import { parseQuery } from '~/common/utils';

import boardListStyle from '../styles/boardListStyle';

@inject((stores) => ({
  menu: stores.menuStore,
  brd: stores.brdStore,
  blt: stores.bltStore,
}))
@withStyles(boardListStyle)
@withRouter
@observer
class BoardLis extends React.Component {
  componentDidMount() {
    const { blt, menu, history } = this.props;
    const qparams = parseQuery(history.location.search);
    blt.setSearchObj({
      searchtype: qparams.searchtype || '',
      searchtxt: qparams.searchtxt || '',
    });

    blt.apiBltList({
      brdid: menu.getMenuInfo.rid,
      currentPageNo: qparams.currentPageNo || 1,
      itemsPerPage: qparams.itemsPerPage || 12,
      ...qparams,
    });
  }

  boardTypeList = () => {
    const { brd } = this.props;
    if (brd.getBrdInfo) {
      switch (brd.getBrdInfo.brdtype) {
        case 'AL':
          return <PhotoTypeBltPr brdid={brd.getBrdInfo.brdid} htype={brd.getBrdInfo.custom1} {...this.props} />;
        case 'LI':
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
        case 'NO':
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
        case 'DA':
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
        case 'AP':
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
        case 'BL':
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
        default:
          return <ListTypeBltPr brdid={brd.getBrdInfo.brdid} {...this.props} />;
      }
    }
    return false;
  }

  render() {
    const { classes, brd, menu } = this.props;
    const brdInfo = brd.getBrdInfo;
    const menuInfo = menu.getMenuInfo;

    return (
      <div className={classes.boardListWrap}>
        <CusHelmet
          title={brdInfo.brdnm}
          description={brdInfo.brddesc}
          url={`${ReactConst.DOMAIN}${menuInfo.upath}`}
        />
        {this.boardTypeList()}
      </div>
    );
  }
}

export default BoardLis;
