import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { edit2 } from 'react-icons-kit/feather/edit2';

import Button from '~/material-kit/CustomButtons/Button';

import cmntStyle from './styles/cmntStyle';

const useStyle = makeStyles(cmntStyle);

const CmntMod = observer(({
  bltInfo, bltcmnt, history,
}) => {
  const classes = useStyle();
  const [cmnt, setCmnt] = useState(bltInfo.cmnt);

  const cmntChange = (e) => {
    setCmnt(e.target.value);
  };

  const apiCmntUpd = async () => {
    const cmntParam = {
      cmntid: bltInfo.cmntid,
      cmnt,
    };

    await bltcmnt.apiBltcmntUpd(cmntParam);
    bltcmnt.setCmntReplyId('');
    bltcmnt.setCmntModId('');

    history.replace(`${history.location.pathname}${history.location.search}`);
  };

  return (
    <div className={classes.cmntWrap}>
      <textarea className={classes.cmntTxt} onChange={cmntChange} value={cmnt} />
      <div className={classes.btnWrap}>
        <Button
          color="primary"
          disabled={false}
          onClick={apiCmntUpd}
        >
          <Icon icon={edit2} /> 등록
        </Button>
      </div>
    </div>
  );
});

export default CmntMod;
