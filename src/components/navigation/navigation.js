import React, {useState} from 'react';
import {List, ListItem, ListItemIcon, ListItemText, makeStyles}
  from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  selected: {
    backgroundColor: 'black',
    color: 'white',
  },
}));

const VerticalNavbar = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          component={Link} to="/dashboard/profile"
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          classes={{selected: classes.selected}}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Me" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/setting"
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          classes={{selected: classes.selected}}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );
};

export default VerticalNavbar;
