import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import RevDiverCo from './RevDiverCo';

const RevDiversCo = observer((props) => {
  const { classes, rev } = props;
  const { getRevDiver } = rev;

  console.log(toJS(getRevDiver));
  return (
    <form className={classes.form}>
      {getRevDiver.map((revDiverItem, idx) => (
        <RevDiverCo
          key={revDiverItem.revdiverkey}
          revDiverItem={revDiverItem}
          idx={idx}
          {...props}
        />
      ))}
    </form>
  );
});

export default RevDiversCo;
