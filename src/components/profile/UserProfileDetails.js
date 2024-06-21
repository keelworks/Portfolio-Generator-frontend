/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */

import React, { useState } from 'react';
import { TextInput, Button, Select, Textarea, Grid } from '@mantine/core';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfession } from '../../services/professionSlice';

const UserProfileDetails = () => {
    
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    profession: '',
    bio: '',
    avatarUrl: '',
    role: '',
    // Projects, skills, education, and experience will be added later
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfessionChange = (value) => {
    setFormData({ ...formData, profession: value });
    dispatch(setProfession(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData);
      console.log('User added successfully:', response.data);
      // Handle success (e.g., clear the form or show a success message)
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error (e.g., show an error message)
    }
  };
      
    return (
        <div className="container-fluid row" style={{ marginTop: '0' }}>
            <div className='col-9 col-md-10 col-lg-10 col-xl-10'>
     
            <form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleProfessionChange}
            data={["Instructional Designer", "UI/UX Designer", "Graphics Designer"]}
          />
        </Grid.Col>
        {formData.profession === 'Instructional Designer' && (
          <Grid.Col span={12}>
            <TextInput
              label="Instructional Design Tool"
              name="instructionalDesignTool"
              value={formData.instructionalDesignTool}
              onChange={handleChange}
            />
          </Grid.Col>
        )}
        {formData.profession === 'UI/UX Designer' && (
          <Grid.Col span={12}>
            <TextInput
              label="UI/UX Design Tool"
              name="uiUxDesignTool"
              value={formData.uiUxDesignTool}
              onChange={handleChange}
            />
          </Grid.Col>
        )}
        {formData.profession === 'Graphics Designer' && (
          <Grid.Col span={12}>
            <TextInput
              label="Graphics Design Tool"
              name="graphicsDesignTool"
              value={formData.graphicsDesignTool}
              onChange={handleChange}
            />
          </Grid.Col>
        )}
        <Grid.Col span={12}>
          <Textarea
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Avatar URL"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value })}
            data={["admin", "user", "guest", "moderator"]}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit">Add User</Button>
        </Grid.Col>
      </Grid>
    </form>

            </div>
        </div>
    );
};

export default UserProfileDetails;
