import React from 'react';
import NavigationSidebar from './navigation/navigation';
import {Routes, Route} from 'react-router';
import ProfileComponent from './profile/profile';
import SettingComponent from './setting/setting';

// eslint-disable-next-line require-jsdoc
function dashBoard() {
  return (
    <div className='row mt-2'>
      <div className='col-2 col-md-2 col-lg-1 col-xl-2'>
        <NavigationSidebar active='explore' />
      </div>
      <div
        className='col-10 col-md-10 col-lg-7 col-xl-6'
        style={{position: 'relative'}}
      >
        <Routes>
          <Route path='/' element={<ProfileComponent />} />
          <Route path='profile' element={<ProfileComponent />} />
          <Route path='setting' element={<SettingComponent />} />
        </Routes>
      </div>
      {/* <div className='d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4'>*/}
      {/*  <WhoToFollowList />*/}
      {/* </div>*/}
    </div>
  );
}

export default dashBoard;
