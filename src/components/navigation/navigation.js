import React, {useState} from 'react';
// import {List, ListItem, ListItemIcon, ListItemText, makeStyles}
//   from '@material-ui/core';
// import SettingsIcon from '@material-ui/icons/Settings';
// import PersonIcon from '@material-ui/icons/Person';
import {createStyles, Navbar,
  Group, Code, getStylesRef, rem} from '@mantine/core';
import {
  IconWorldWww,
  IconTrash,
  IconLayoutDashboard,
  IconLogout,
} from '@tabler/icons-react';
// import {MantineLogo} from '@mantine/ds';
// import {Link} from 'react-router-dom';
import {logoutThunk, deleteUserThunk} from '../../services/authorize-thunk';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import {Dashboard} from 'tabler-icons-react';
// import dashBoard from '..';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    'display': 'flex',
    'alignItems': 'center',
    'textDecoration': 'none',
    'fontSize': theme.fontSizes.sm,
    // eslint-disable-next-line max-len
    'color': theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    'padding': `${theme.spacing.xs} ${theme.spacing.sm}`,
    'borderRadius': theme.radius.sm,
    'fontWeight': 500,

    '&:hover': {
      // eslint-disable-next-line max-len
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    // eslint-disable-next-line max-len
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      // eslint-disable-next-line max-len
      backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
      // eslint-disable-next-line max-len
      color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
      [`& .${getStylesRef('icon')}`]: {
        // eslint-disable-next-line max-len
        color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
      },
    },
  },
}));

const data = [
  {link: '#', label: 'Dashboard', icon: IconLayoutDashboard},
  {link: '#', label: 'Website', icon: IconWorldWww},
];
const VerticalNavbar = () => {
  const {classes, cx} = useStyles();
  const [active, setActive] = useState('Dashboard');

  const links = data.map((item) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <a
        className={cx(classes.link,
            {[classes.linkActive]: item.label === active})}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          // event.preventDefault();
          setActive(item.label);
        } }
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </>
  ));
  // Logout and delete account handle
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line max-len
  const userId = useSelector((state) => state.currentUser ? state.currentUser._id : null);

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    // 在这里添加你的注销逻辑
    dispatch(logoutThunk())
        .then(() => {
          navigate('/login'); // 你的登录页面路由，这里假设它是/login
        });
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete Account button clicked');
    // 在这里添加你的删除帐户逻辑
    // eslint-disable-next-line max-len
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      dispatch(deleteUserThunk(userId))
          .then(() => {
            navigate('/login'); // 你的登录页面路由，这里假设它是/login
          });
    }
  };

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <Navbar width={{sm: 300}} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo size={28} />*/}
          <Code sx={{fontWeight: 700}}>v3.1.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="/login" className={classes.link}
          onClick={handleLogoutClick}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <a href="#" className={classes.link}
          onClick={handleDeleteAccountClick}>
          <IconTrash className={classes.linkIcon} stroke={1.5} />
          <span>Delete Account</span>
        </a>
      </Navbar.Section>
    </Navbar>
    // <div className={classes.root}>
    //   <List component="nav" aria-label="main mailbox folders">
    //     <ListItem
    //       component={Link} to="/dashboard/profile"
    //       button
    //       selected={selectedIndex === 0}
    //       onClick={(event) => handleListItemClick(event, 0)}
    //       classes={{selected: classes.selected}}
    //     >
    //       <ListItemIcon>
    //         <PersonIcon />
    //       </ListItemIcon>
    //       <ListItemText primary="profile" />
    //     </ListItem>
    //     <ListItem
    //       component={Link} to="/dashboard/setting"
    //       button
    //       selected={selectedIndex === 1}
    //       onClick={(event) => handleListItemClick(event, 1)}
    //       classes={{selected: classes.selected}}
    //     >
    //       <ListItemIcon>
    //         <SettingsIcon />
    //       </ListItemIcon>
    //       <ListItemText primary="Settings" />
    //     </ListItem>
    //   </List>
    // </div>
  );
};

export default VerticalNavbar;
