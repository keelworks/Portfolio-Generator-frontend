/* eslint-disable arrow-parens */
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
  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  //   dob: '',
  //   profession: '',
  //   bio: '',
  //   avatarUrl: '',
  //   role: '',
  //   html: '', // For storing HTML content
  //   css: '', // For storing CSS content
  //   js: '', // For storing JS content
  //   video: null // For storing video file
  // });

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
    html: '', // For storing HTML content
    css: '', // For storing CSS content
    js: '', // For storing JS content
    video: null, // For storing video file
    portfolioImage: null,
    linkedIn: '',
    email: '',
    behance: '',
    designPhilosophy: '',
    samplesOfWork: '',
    scenario: {
      title: '',
      thumbnail: null,
      details: '',
      html: '', // For storing HTML content
      css: '', // For storing CSS content
      js: '', // For storing JS content
    },
    softwareSimulation: {
      title: '',
      thumbnail: null,
      details: '',
      videoFile: null
    },
    workFlow: {
      title: '',
      thumbnail: null,
      details: '',
      html: '', // For storing HTML content
      css: '', // For storing CSS content
      js: '', // For storing JS content
    },
    quiz: {
      title: '',
      thumbnail: null,
      details: '',
      html: '', // For storing HTML content
      css: '', // For storing CSS content
      js: '', // For storing JS content
    }
  });

  const handleProfessionChange = (value) => {
    setFormData({ ...formData, profession: value });
    dispatch(setProfession(value));
  };

  console.log('formData', formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const updatedFormData = {
      username: formElements.username.value,
      password: formElements.password.value,
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      dob: formElements.dob.value,
      profession: formElements.profession.value,
      bio: formElements.bio.value,
      avatarUrl: formElements.avatarUrl.value,
      role: formElements.role.value,
      html: formData.html, // Maintain file data
      css: formData.css, // Maintain file data
      js: formData.js, // Maintain file data
      video: formData.video // Maintain video file
      
    };

    setFormData(updatedFormData);

    try {
      const formDataForUpload = new FormData();
      Object.keys(updatedFormData).forEach(key => {
        formDataForUpload.append(key, updatedFormData[key]);
      });

      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User added successfully:', response.data);
      // Handle success (e.g., clear the form or show a success message)
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const fileEntries = [];
    for (let i = 0; i < files.length; i++) {
        fileEntries.push(files[i]);
    }

    const htmlFile = fileEntries.find(file => file.name.endsWith('.html'));
    const cssFiles = fileEntries.filter(file => file.name.endsWith('.css'));
    const jsFiles = fileEntries.filter(file => file.name.endsWith('.js'));

    if (htmlFile || cssFiles.length > 0 || jsFiles.length > 0) {
        if (htmlFile) {
            const htmlContent = await readFileContent(htmlFile);
            const cssContent = await Promise.all(cssFiles.map(file => readFileContent(file)));
            const jsContent = await Promise.all(jsFiles.map(file => readFileContent(file)));

            const combinedCss = cssContent.join('\n');
            const combinedJs = jsContent.join('\n');

            setFormData((prevData) => ({
                ...prevData,
                html: htmlContent,
                css: combinedCss,
                js: combinedJs,
            }));
        } else {
            alert('Please upload a folder containing an HTML file.');
        }
    } else {
        alert('Please upload a folder containing HTML, CSS, or JS files.');
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prevData => ({
        ...prevData,
        video: file
      }));
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
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
                defaultValue={formData.username}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Password"
                name="password"
                type="password"
                defaultValue={formData.password}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="First Name"
                name="firstName"
                defaultValue={formData.firstName}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                name="lastName"
                defaultValue={formData.lastName}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Date of Birth"
                name="dob"
                defaultValue={formData.dob}
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
                  defaultValue={formData.instructionalDesignTool}
                />
              </Grid.Col>
            )}
            {formData.profession === 'UI/UX Designer' && (
              <Grid.Col span={12}>
                <TextInput
                  label="UI/UX Design Tool"
                  name="uiUxDesignTool"
                  defaultValue={formData.uiUxDesignTool}
                />
              </Grid.Col>
            )}
            {formData.profession === 'Graphics Designer' && (
              <Grid.Col span={12}>
                <TextInput
                  label="Graphics Design Tool"
                  name="graphicsDesignTool"
                  defaultValue={formData.graphicsDesignTool}
                />
              </Grid.Col>
            )}
            <Grid.Col span={12}>
              <Textarea
                label="Bio"
                name="bio"
                defaultValue={formData.bio}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Avatar URL"
                name="avatarUrl"
                defaultValue={formData.avatarUrl}
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
            <div>HTML File</div>
              <input type="file" webkitdirectory="true" multiple onChange={handleFileUpload} />
            </Grid.Col>
            <Grid.Col span={12}>
            <div>Video File</div>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button type="submit">submit details</Button>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default UserProfileDetails;
