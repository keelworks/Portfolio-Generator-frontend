/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable key-spacing */
import React, { useState, useEffect } from 'react';
import { createStyles, Navbar, Group, getStylesRef, rem, Image } from '@mantine/core';
import { IconWorldWww, IconTrash, IconLayoutDashboard, IconLogout } from '@tabler/icons-react';
import { logoutThunk, deleteUserThunk } from '../../services/authorize-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import keelworksLogo from '../../icons/keelworksIcon.svg';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },
  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },
  linkIcon: {
    ref: getStylesRef('icon'),
    minWidth: 24,
    minHeight: 24,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const VerticalNavbar = ({ setActivePage }) => {
  const { classes, cx } = useStyles();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 920);
  const user = useSelector((state) => state.currentUser);
  const profession = useSelector((state) => state.currentUser.profession);
  const professionWebsites = {
    'Instructional Designer': `/Instruction_Designer/portfolio/${user.id}`,
    'UI/UX Designer': 'https://ui-ux-design-example.com',
    'Graphics Designer': 'https://graphics-design-example.com',
  };

  console.log(profession, 'user', professionWebsites[profession]);

  const data = [
    { link: 'profile', label: 'Dashboard', icon: IconLayoutDashboard },
    { link: 'portfolio_details', label: 'Portfolio Details', icon: IconLayoutDashboard },
    { link: profession ? professionWebsites[profession] : '/user/default', label: 'Website', icon: IconWorldWww, external: true },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 920);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = (link, external) => {
    if (external) {
      window.open(link, '_blank');
    } else {
      setActivePage(link);
    }
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link)}
      href="#"
      key={item.label}
      onClick={() => handleLinkClick(item.link, item.external)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span style={{ display: isSmallScreen ? 'none' : 'inline' }}>
        {item.label}
      </span>
    </a>
  ));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.currentUser ? state.currentUser.id : null);

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    dispatch(logoutThunk())
      .then(() => {
        localStorage.removeItem('currentUser');
        navigate('/login');
      });
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete Account button clicked');
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      dispatch(deleteUserThunk(userId))
        .then(() => {
          navigate('/login');
        });
    }
  };

  return (
    <Navbar p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image src={keelworksLogo} size={28} />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={handleLogoutClick}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span style={{ display: isSmallScreen ? 'none' : 'inline' }}>
            Logout
          </span>
        </a>

        <a href="#" className={cx(classes.link)} onClick={handleDeleteAccountClick}>
          <IconTrash className={classes.linkIcon} stroke={1.5} />
          <span style={{ display: isSmallScreen ? 'none' : 'inline' }}>
            Delete account
          </span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default VerticalNavbar;
