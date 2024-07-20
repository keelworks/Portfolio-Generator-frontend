import React, { useState } from 'react';
import NavigationSidebar from './navigation/VerticalNavbar.js';
import WelcomePage from './profile/WelcomePage.js';
import UserProfileDetails from './profile/UserProfileDetails.js';

const DashBoard = () => {
  const [activePage, setActivePage] = useState('profile');

  const renderActivePage = () => {
    switch (activePage) {
      case 'portfolio_details':
        return <UserProfileDetails />;
      case 'profile':
      default:
        return <WelcomePage />;
    }
  };

  const styles = {
    container: {
      marginTop: '0',
    },
    sidebar: {
      position: 'fixed',
      top: '0',
      height: '100vh',
      zIndex: '1000',
      padding: '0',
      width: '16.6667%', // This makes it a col-2 equivalent
    },
    content: {
      marginLeft: '16.6667%', // This aligns it with the fixed sidebar
      width: 'calc(100% - 16.6667%)', // This ensures the content does not overflow horizontally
      position: 'relative',
    },
  };

  return (
    <div className="container-fluid row" style={styles.container}>
      <div style={styles.sidebar}>
        <NavigationSidebar active='explore' setActivePage={setActivePage} />
      </div>
      <div style={styles.content}>
        {renderActivePage()}
      </div>
    </div>
  );
};

export default DashBoard;
