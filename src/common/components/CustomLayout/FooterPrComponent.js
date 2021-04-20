import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import * as baronLogo2 from '~/assets/img/baron_logo2.png';

import footerStyle from './styles/footerStyle';

const useStyles = makeStyles(footerStyle);

const FooterPr = (props) => {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.footerLogo}><img src={baronLogo2} alt="BARON DIVE" /></div>
        <div className={classes.footerTxt}>
          <address className={classes.addressTxt}>
            <span className={classNames(classes.footerSpan, classes.footerSpanFirst)}>
              K and Y BARON DIVE CENTER Inc. REG NO. CS201915723, Danao, Panglao, Bohol, Philippines, 6340
            </span><br />
            <span className={classNames(classes.footerSpan, classes.footerSpanName)}>대표 권준혁, 윤영주</span>
          </address>
          <div>
            <span className={classNames(classes.footerSpan, classes.footerSpanFirst)}>+63 927 930 2877 토미강사</span> /
            <span className={classes.footerSpan}>+63 977 132 1474 줄리강사</span>
          </div>
        </div>
      </div>
      <div className={classes.copyright}>
        CopyRight &copy; 2019 BARON DIVE All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterPr;
