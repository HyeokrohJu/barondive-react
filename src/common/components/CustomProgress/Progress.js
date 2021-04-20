import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';

import progressStyle from './styles/progressStyle';

const useStyles = makeStyles(progressStyle);

const Progress = (props) => {
  const classes = useStyles({});
  return (
    <Fade in={props.active}>
      <div className={classes.progressBar}>
        <LinearProgress
          color="primary"
          variant="determinate"
          value={props.progress}
        />
      </div>
    </Fade>
  );
};


export default Progress;
