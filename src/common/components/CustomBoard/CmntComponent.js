import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { edit2 } from 'react-icons-kit/feather/edit2';

import Button from '~/material-kit/CustomButtons/Button';

import cmntStyle from './styles/cmntStyle';

const useStyle = makeStyles(cmntStyle);

const Cmnt = observer(({
  bltInfo, bltcmnt, history, replyFlag,
}) => {
  const classes = useStyle();
  const [cmnt, setCmnt] = useState('');

  const cmntChange = (e) => {
    setCmnt(e.target.value);
  };

  const apiCmntIns = async () => {
    let cmntParam = {
      brdid: bltInfo.brdid,
      bltid: bltInfo.bltid,
      cmnt,
      state: 'Y',
      rcmdcnt: '0',
    };

    if (replyFlag) {
      cmntParam = {
        ...cmntParam,
        currtcmntid: bltInfo.cmntid,
      };
    }

    await bltcmnt.apiBltcmntIns(cmntParam);
    bltcmnt.setCmntReplyId('');

    history.replace(`${history.location.pathname}${history.location.search}`);
  };

  return (
    <div>
      <h4 className={classes.cmntTitle}>댓글 등록</h4>
      <div className={classes.cmntWrap}>
        <textarea className={classes.cmntTxt} onChange={cmntChange} />
        <div className={classes.btnWrap}>
          <Button
            color="primary"
            disabled={false}
            onClick={apiCmntIns}
          >
            <Icon icon={edit2} /> 등록
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Cmnt;
