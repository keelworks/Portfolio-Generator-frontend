import React, {useState} from 'react';
// import {List, ListItem, ListItemIcon, ListItemText, makeStyles}
//   from '@material-ui/core';
// import SettingsIcon from '@material-ui/icons/Settings';
// import PersonIcon from '@material-ui/icons/Person';
import {createStyles, Navbar,
  Group, Code, getStylesRef, rem} from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
// import {MantineLogo} from '@mantine/ds';
// import {Link} from 'react-router-dom';

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
  {link: '', label: 'Notifications', icon: IconBellRinging},
  {link: '', label: 'Billing', icon: IconReceipt2},
  {link: '', label: 'Security', icon: IconFingerprint},
  {link: '', label: 'SSH Keys', icon: IconKey},
  {link: '', label: 'Databases', icon: IconDatabaseImport},
  {link: '', label: 'Authentication', icon: Icon2fa},
  {link: '', label: 'Other Settings', icon: IconSettings},
];

const VerticalNavbar = () => {
  const {classes, cx} = useStyles();
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <a
      className={cx(classes.link,
          {[classes.linkActive]: item.label === active})}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

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
        <a href="#" className={classes.link}
          onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link}
          onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
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
