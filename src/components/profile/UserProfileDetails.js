/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
import React, { useState, useEffect } from 'react';
import { Select, Grid } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { setProfession } from '../../services/professionSlice';
import InstructionalDesigner from '../professionDetails/InstructionalDesigner.js';

const UserProfileDetails = () => {
  // const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const [profession, setProfessionState] = useState(currentUser.profession || '');

  useEffect(() => {
    if (currentUser.profession) {
      setProfessionState(currentUser.profession);
    }
  }, [currentUser]);

  // const handleProfessionChange = (value) => {
  //   setProfessionState(value);
  //   dispatch(setProfession(value));
  // };

  // const professions = ["Instructional Designer", "UI/UX Designer", "Graphics Designer"];

  return (
    <div className="container-fluid row" style={{ margin: '2vw', padding: '2vw'}}>
      <div className='col-9 col-md-10 col-lg-10 col-xl-10'>
        <Grid>
          {/* <Grid.Col span={6}>
            <Select
              label="Profession"
              name="profession"
              value={profession}
              onChange={handleProfessionChange}
              data={professions}
            />
          </Grid.Col> */}
          {profession === 'Instructional Designer' && (
            <Grid.Col span={12}>
              <InstructionalDesigner profession={profession} />
            </Grid.Col>
          )}
          {profession !== 'Instructional Designer' && (
            <Grid.Col span={12}>
              <h3> Portfolio for {profession} comming soon... </h3>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default UserProfileDetails;
