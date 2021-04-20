import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


import searchStyle from './styles/searchStyle';

const useStyle = makeStyles(searchStyle);

const Search = observer((props) => {
  const {
    item, itemkey, onChange, onSearchBtn,
  } = props;
  const classes = useStyle();

  return (
    <div className={classes.searchWrap}>
      <InputBase
        id="searchtxt"
        className={classes.searchInput}
        placeholder="검색어 입력"
        inputProps={{ 'aria-label': '검색어 입력' }}
        value={item[itemkey] || ''}
        onChange={onChange}
      />
      <IconButton type="button" onClick={onSearchBtn} className={classes.searchIconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
});

export default Search;
