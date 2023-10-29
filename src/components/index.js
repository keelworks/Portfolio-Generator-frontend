import React from 'react';
import NavigationSidebar from './navigation/navigation';
import {Routes, Route} from 'react-router';
import ProfileComponent from './profile/profile';

// eslint-disable-next-line require-jsdoc
function dashBoard() {
  return (
    <div className='row mt-2'>
      <div className='col-2 col-md-2 col-lg-2 col-xl-2'>
        <NavigationSidebar active='explore' />
      </div>
      <div className='col-10 col-md-10 col-lg-10 col-xl-10'
        style={{position: 'relative'}}>
        <Routes>
          <Route path='/' element={<ProfileComponent />} />
          <Route path='profile' element={<ProfileComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default dashBoard;
