import React from 'react';
import classNames from 'classnames';
import { toJS } from 'mobx';
import Slider from 'react-slick';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';
import ReactHtmlParser from 'react-html-parser';

import GridContainer from '~/material-kit/Grid/GridContainer';
import GridItem from '~/material-kit/Grid/GridItem';
import { CardImgPr, MainBltPr } from '~/common/components';
import * as main01 from '~/assets/img/main01.jpg';
import * as main02 from '~/assets/img/main02.jpg';
import * as main03 from '~/assets/img/main03.jpg';
import * as main04 from '~/assets/img/main04.jpg';
import * as main05 from '~/assets/img/main05.jpg';

import RightList from './modules/RightListContainer';
import styles from './styles/mainStyle';

@inject((stores) => ({
  blt: stores.bltStore,
  menu: stores.menuStore,
}))
@withRouter
@withStyles(styles)
@observer
class Main extends React.Component {
  componentDidMount() {
    const { blt, match } = this.props;
    blt.apiBltList({
      brdid: 'BRD0000001',
      currentPageNo: 1,
      itemsPerPage: 1,
      ...match.params,
    });
    blt.apiBltList({
      brdid: 'BRD0000002',
      currentPageNo: 1,
      itemsPerPage: 2,
      ...match.params,
    });
    blt.apiBltList({
      brdid: 'BRD0000004',
      currentPageNo: 1,
      itemsPerPage: 6,
      ...match.params,
    });
    blt.apiBltList({
      brdid: 'BRD0000005',
      currentPageNo: 1,
      itemsPerPage: 6,
      ...match.params,
    });
  }

  PrevArrow = ({ onClick }) => {
    const { classes } = this.props;
    return (
      <button
        type="button"
        className={classes.prevArrow}
        onClick={onClick}
      >
        <Icon icon={chevronLeft} className={classes.iconSt} />
      </button>
    );
  };

  NextArrow = ({ onClick }) => {
    const { classes } = this.props;
    return (
      <button
        type="button"
        className={classes.nextArrow}
        onClick={onClick}
      >
        <Icon icon={chevronRight} className={classes.iconSt} />
      </button>
    );
  };

  render() {
    const { classes, blt } = this.props;

    const settings = {
      dots: true,
      dotsClass: classNames('slick-dots', classes.slideDot),
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <this.NextArrow />,
      prevArrow: <this.PrevArrow />,
    };

    const baronstroy = toJS(blt.getBltList.get('BRD0000001'));
    const tourstroy = toJS(blt.getBltList.get('BRD0000002'));

    return (
      <>
        <div className="stickyWrap">
          <Slider {...settings}>
            <div className="slick-image">
              <div className={classes.mainImg} style={{ backgroundImage: `url(${main01})` }}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem>
                      <div className={classes.brand}>
                        <h1 className={classes.title}>BARON DIVE</h1>
                        <h3 className={classes.subtitle}>
                          Let&apos;s keep the Honor of Dive!!
                        </h3>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
            <div className="slick-image">
              <div className={classes.mainImg} style={{ backgroundImage: `url(${main02})` }}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem>
                      <div className={classes.brand}>
                        <h1 className={classes.title}>BARON DIVE</h1>
                        <h3 className={classes.subtitle}>
                          Let&apos;s keep the Honor of Dive!!
                        </h3>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
            <div className="slick-image">
              <div className={classes.mainImg} style={{ backgroundImage: `url(${main03})` }}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem>
                      <div className={classes.brand}>
                        <h1 className={classes.title}>BARON DIVE</h1>
                        <h3 className={classes.subtitle}>
                          Let&apos;s keep the Honor of Dive!!
                        </h3>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
            <div className="slick-image">
              <div className={classes.mainImg} style={{ backgroundImage: `url(${main04})` }}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem>
                      <div className={classes.brand}>
                        <h1 className={classes.title}>BARON DIVE</h1>
                        <h3 className={classes.subtitle}>
                          Let&apos;s keep the Honor of Dive!!
                        </h3>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
            <div className="slick-image">
              <div className={classes.mainImg} style={{ backgroundImage: `url(${main05})` }}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem>
                      <div className={classes.brand}>
                        <h1 className={classes.title}>BARON DIVE</h1>
                        <h3 className={classes.subtitle}>
                          Let&apos;s keep the Honor of Dive!!
                        </h3>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.mainCont}>
            <div className={classes.mainContSub}>
              <GridContainer justify-xs-center="true" classes={{ root: classes.gridRoot }}>
                <GridItem xs={12} sm={12} md={12} lg={9}>
                  <GridContainer justify-xs-center="true">
                    <GridItem xs={12} sm={12} md={6} className={classes.mainCard}>
                      <Typography
                        component="p"
                        variant="subtitle1"
                        className={classes.cardItemTitle}
                        color="textPrimary"
                      >
                        Baron Story
                      </Typography>
                      {baronstroy && baronstroy.selectBltPg.map((item) => {
                        let contTxt = item.cont && item.cont.replace(/(<([^>]+)>)/ig, '');
                        contTxt = contTxt && ReactHtmlParser(contTxt)[0].substring(0, 100);

                        return (
                          <CardImgPr
                            key={item.bltid}
                            cardHeight={window.innerWidth > 959 ? 600 : 360}
                            cardImg={item.filethumb}
                            cardTitle={item.title}
                            titleColor={item.custom1}
                            cardSubTitle="Baron Story"
                            cardCont={contTxt}
                            cardLink={`/story/baronstory/get?bltid=${item.bltid}`}
                            {...this.props}
                          />
                        );
                      })}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.mainCard}>
                      <Typography
                        component="p"
                        variant="subtitle1"
                        className={classes.cardItemTitle}
                        color="textPrimary"
                      >
                        Tour Story
                      </Typography>
                      {tourstroy && tourstroy.selectBltPg.map((item) => (
                        <CardImgPr
                          key={item.bltid}
                          cardHeight={window.innerWidth > 959 ? 250 : 200}
                          cardImg={item.filethumb}
                          cardTitle={item.title}
                          titleColor={item.custom1}
                          cardSubTitle="Tour Story"
                          cardLink={`/story/tourstory/get?bltid=${item.bltid}`}
                          {...this.props}
                        />
                      ))}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.mainBbs}>
                      <Typography
                        component="p"
                        variant="subtitle1"
                        className={classes.cardItemTitle}
                        color="textPrimary"
                      >
                        공지사항
                      </Typography>
                      <MainBltPr brdid="BRD0000004" bltlink="/community/notice/get?bltid=" {...this.props} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.mainBbs}>
                      <Typography
                        component="p"
                        variant="subtitle1"
                        className={classes.cardItemTitle}
                        color="textPrimary"
                      >
                        여행후기
                      </Typography>
                      <MainBltPr brdid="BRD0000005" bltlink="/community/review/get?bltid=" {...this.props} />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={3}>
                  <GridContainer justify-xs-center="true">
                    <GridItem xs={12} sm={12} md={12}>
                      <RightList />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
