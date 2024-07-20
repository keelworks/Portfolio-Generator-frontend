import React, { useState } from 'react';
import NavigationSidebar from './navigation/navigation';
import WelcomePage from './profile/WelcomePage';
import UserProfileDetails from './profile/UserProfileDetails';

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

  return (
    <div className="container-fluid row" style={{ marginTop: '0' }}>
      <div className='col-3 col-md-2 col-lg-2 col-xl-2' style={{ padding: '0' }}>
        <NavigationSidebar active='explore' setActivePage={setActivePage} />
      </div>
      <div className='col-9 col-md-10 col-lg-10 col-xl-10' style={{ position: 'relative' }}>
        {renderActivePage()}
      </div>
    </div>
  );
};

export default DashBoard;
