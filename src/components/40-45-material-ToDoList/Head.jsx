import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { ListItem, ListItemText, Divider, TextField, ListItemIcon } from '@material-ui/core';
import { OutsideAlerter } from './mouseEventHook';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 700,
    marginLeft: '3rem',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ item }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  let filteredItems;
  if (search) {
    filteredItems = item.filter((eacItem) => {
      return eacItem.title.toLowerCase().includes(search.toLowerCase())
    });
  } else {
    filteredItems = [];
  }
  console.log(search);
  const [showSearchBar, setShowSearchBar] = useState(false)
  console.log(showSearchBar);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            To Do List
          </Typography>
          <div
            className={classes.search}
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <OutsideAlerter setShowSearchBar={setShowSearchBar}>
        <div className={`searchResultBar ${showSearchBar ? 'show' : 'hide'}`}
        >
          <div className='searchHeading'>
            <div > Search result </div>
            <span className='searchText wordBreak'> {search}</span>
          </div>

          {filteredItems &&
            filteredItems.map((eachItem, index) => {
              return (<div key={index}>
                <ListItem >
                  <ListItemText primary={eachItem.title} secondary={eachItem.date + " at " + eachItem.time} className='wordBreak' />
                  <ListItemIcon>
                    {/* <span className="myBtn myBtn-primary"
                      onClick={() => selectToEdit(eachItem.id)}  ><EditIcon /></span> */}
                  </ListItemIcon>
                  <ListItemIcon>
                    {/* <span className="myBtn"
                      onClick={() => deleteItem(eachItem.id)}  ><DeleteForeverIcon /></span> */}
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </div>)
            }
            )}
        </div>
      </OutsideAlerter>

    </div>
  );
}