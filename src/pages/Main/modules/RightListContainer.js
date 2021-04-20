import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { Icon } from 'react-icons-kit';
import { credit } from 'react-icons-kit/entypo/credit';
import { email } from 'react-icons-kit/entypo/email';
import { message } from 'react-icons-kit/entypo/message';
import { instagram } from 'react-icons-kit/entypo/instagram';

import styles from '~/pages/Main/styles/rightListStyle';

const useStyles = makeStyles(styles);

const RightList = () => {
  const classes = useStyles();

  return (
    <List className={classes.rightList}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.leftAvatar}>
            <Icon icon={credit} className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="입금 계좌번호"
          classes={{ primary: classes.listItemPrimary }}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              className={classes.listPriText}
              color="textPrimary"
            >
              신한은행 100-024-371015<br />예금주 권준혁
            </Typography>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.divider} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.leftAvatar}>
            <Icon icon={email} className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="이메일"
          classes={{ primary: classes.listItemPrimary }}
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.listPriText}
                color="textPrimary"
              >
                barondivebohol@gmail.com
              </Typography>
            </>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.divider} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.leftAvatar}>
            <Icon icon={message} className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="카카오톡"
          classes={{ primary: classes.listItemPrimary }}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              className={classes.listPriText}
              color="textPrimary"
            >
              barondive
            </Typography>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.divider} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.leftAvatar}>
            <Icon icon={message} className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="카카오채널"
          classes={{ primary: classes.listItemPrimary }}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              className={classes.listPriText}
              color="textPrimary"
            >
              @바론다이브
            </Typography>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.divider} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={classes.leftAvatar}>
            <Icon icon={instagram} className={classes.avatarIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="인스타그램"
          classes={{ primary: classes.listItemPrimary }}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              className={classes.listPriText}
              color="textPrimary"
            >
              baron_dive
            </Typography>
          )}
        />
      </ListItem>
    </List>
  );
};

export default RightList;
