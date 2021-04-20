import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

import { parseQuery } from '~/common/utils';

import styles from './styles/cardImgStyle';

const useStyle = makeStyles(styles);

const CardImgPr = (props) => {
  const classes = useStyle();
  const {
    history,
    cardImg, cardTitle, cardSubTitle, cardCont, cardLink, cardHeight,
    cardContNoEllipsis, cardLinkExFlag, titleColor,
  } = props;

  const cardTxtClasses = classNames({
    [classes.cardTxtTitle]: true,
    [classes.cardTxtContNone]: !cardCont,
  });

  const pageLocation = () => {
    if (cardLinkExFlag) {
      window.open(cardLink);
    } else {
      const path = cardLink.substring(0, cardLink.indexOf('?'));
      const lparams = parseQuery(cardLink.substring(cardLink.indexOf('?') + 1));
      const qparams = parseQuery(history.location.search);
      const nwSearch = {
        ...qparams,
        ...lparams,
      };

      history.push({
        pathname: path,
        search: queryString.stringify(nwSearch),
      });
    }
  };

  return (
    <div className={classes.cardWrap}>
      <div className={classes.cardBody} role="button" tabIndex={0} onClick={() => pageLocation()} onKeyDown={() => pageLocation()}>
        <div className={classes.cardImg}>
          <div className={classes.cardMainImg} style={{ backgroundImage: `url(${cardImg})`, height: cardHeight }} />
        </div>
        <div className={classes.cardTxt}>
          <div className={classes.cardTxtSubTitle}>
            <h6>{cardSubTitle}</h6>
          </div>
          <h4 className={cardTxtClasses}>
            <span className={classes.careTxtEllipsis} style={{ color: titleColor }}>{cardTitle}</span>
          </h4>
          {cardCont && (
          <p className={classes.cardTxtCont}>
            <span className={(cardContNoEllipsis ? '' : classes.careTxtEllipsis)}>{cardCont}</span>
          </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardImgPr;
