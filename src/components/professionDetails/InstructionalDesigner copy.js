/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
import React, { useState } from 'react';
import { TextInput, Textarea, Grid, Button, Title } from '@mantine/core';
import axios from 'axios';

const InstructionalDesigner = ({ profession }) => {
  const [formData, setFormData] = useState({
    bio: '',
    resume: null,
    portfolioImage: null,
    linkedIn: '',
    email: '',
    behance: '',
    designPhilosophy: '',
    samplesOfWork: '',
    avatarUrl: '',
    scenario: {
      title: '',
      thumbnail: null,
      details: '',
      html: '',
      css: '',
      js: '',
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
      html: '',
      css: '',
      js: '',
    },
    quiz: {
      title: '',
      thumbnail: null,
      details: '',
      html: '',
      css: '',
      js: '',
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const updatedFormData = {
      // bio: formElements.bio?.value || '',
      resume: formElements.resume?.files[0] || null,
      portfolioImage: formElements.portfolioImage?.files[0] || null,
      linkedIn: formElements.linkedIn?.value || '',
      email: formElements.email?.value || '',
      behance: formElements.behance?.value || '',
      designPhilosophy: formElements.designPhilosophy?.value || '',
      samplesOfWork: formElements.samplesOfWork?.value || '',
      // avatarUrl: formElements.avatarUrl?.value || '',
      scenario: formData.scenario,
      softwareSimulation: formData.softwareSimulation,
      workFlow: formData.workFlow,
      quiz: formData.quiz
    };

    setFormData(updatedFormData);

    console.log('data', updatedFormData);

    try {
      const formDataForUpload = new FormData();
      Object.keys(updatedFormData).forEach(key => {
        if (updatedFormData[key] instanceof File) {
          formDataForUpload.append(key, updatedFormData[key]);
        } else if (typeof updatedFormData[key] === 'object' && updatedFormData[key] !== null) {
          Object.keys(updatedFormData[key]).forEach(subKey => {
            formDataForUpload.append(`${key}[${subKey}]`, updatedFormData[key][subKey]);
          });
        } else {
          formDataForUpload.append(key, updatedFormData[key]);
        }
      });

      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleFileUpload = async (event, section) => {
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
          [section]: {
            ...prevData[section],
            html: htmlContent,
            css: combinedCss,
            js: combinedJs,
          }
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

  if (profession !== 'Instructional Designer') return null;

  return (
    <form onSubmit={handleSubmit}>
      <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Instructional Designer Portfolio Information
        </Title>
      <Grid>
        {/* <Grid.Col span={12}>
          <Textarea
            label="Bio"
            name="bio"
            defaultValue={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </Grid.Col> */}
        <Grid.Col span={12}>
          <div>Resume</div>
          <input type="file" accept=".pdf,.doc,.docx" name="resume" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Portfolio Image</div>
          <input type="file" accept="image/*" name="portfolioImage" onChange={(e) => setFormData({ ...formData, portfolioImage: e.target.files[0] })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="LinkedIn"
            name="linkedIn"
            defaultValue={formData.linkedIn}
            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Email"
            name="email"
            defaultValue={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Behance"
            name="behance"
            defaultValue={formData.behance}
            onChange={(e) => setFormData({ ...formData, behance: e.target.value })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Design Philosophy"
            name="designPhilosophy"
            defaultValue={formData.designPhilosophy}
            onChange={(e) => setFormData({ ...formData, designPhilosophy: e.target.value })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Samples of Work"
            name="samplesOfWork"
            defaultValue={formData.samplesOfWork}
            onChange={(e) => setFormData({ ...formData, samplesOfWork: e.target.value })}
          />
        </Grid.Col>

        {/* Scenario Section */}
        <hr />
        <h3>Scenario</h3>
        <Grid.Col span={12}>
          <TextInput
            label="Scenario Title"
            name="scenarioTitle"
            value={formData.scenario.title}
            onChange={(e) => setFormData({ ...formData, scenario: { ...formData.scenario, title: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Scenario Details"
            name="scenarioDetails"
            value={formData.scenario.details}
            onChange={(e) => setFormData({ ...formData, scenario: { ...formData.scenario, details: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Scenario Thumbnail</div>
          <input type="file" accept="image/*" name="scenarioThumbnail" onChange={(e) => setFormData({ ...formData, scenario: { ...formData.scenario, thumbnail: e.target.files[0] } })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Scenario HTML</div>
          <input type="file" directory="" webkitdirectory="" multiple onChange={(e) => handleFileUpload(e, 'scenario')} />
        </Grid.Col>

        {/* Software Simulation Section */}
        <h3>Simulation</h3>
        <Grid.Col span={12}>
          <TextInput
            label="Software Simulation Title"
            name="softwareSimulationTitle"
            value={formData.softwareSimulation.title}
            onChange={(e) => setFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, title: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Software Simulation Details"
            name="softwareSimulationDetails"
            value={formData.softwareSimulation.details}
            onChange={(e) => setFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, details: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Software Simulation Thumbnail</div>
          <input type="file" accept="image/*" name="softwareSimulationThumbnail" onChange={(e) => setFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, thumbnail: e.target.files[0] } })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Software Simulation Video</div>
          <input type="file" accept="video/*" name="softwareSimulationVideo" onChange={handleVideoUpload} />
        </Grid.Col>

        {/* Work Flow Section */}
        <h3>Work Flow</h3>
        <Grid.Col span={12}>
          <TextInput
            label="Work Flow Title"
            name="workFlowTitle"
            value={formData.workFlow.title}
            onChange={(e) => setFormData({ ...formData, workFlow: { ...formData.workFlow, title: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Work Flow Details"
            name="workFlowDetails"
            value={formData.workFlow.details}
            onChange={(e) => setFormData({ ...formData, workFlow: { ...formData.workFlow, details: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Work Flow Thumbnail</div>
          <input type="file" accept="image/*" name="workFlowThumbnail" onChange={(e) => setFormData({ ...formData, workFlow: { ...formData.workFlow, thumbnail: e.target.files[0] } })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Work Flow HTML</div>
          <input type="file" directory="" webkitdirectory="" multiple onChange={(e) => handleFileUpload(e, 'workFlow')} />
        </Grid.Col>

        {/* Quiz Section */}
        <h3>Quiz</h3>
        <Grid.Col span={12}>
          <TextInput
            label="Quiz Title"
            name="quizTitle"
            value={formData.quiz.title}
            onChange={(e) => setFormData({ ...formData, quiz: { ...formData.quiz, title: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Quiz Details"
            name="quizDetails"
            value={formData.quiz.details}
            onChange={(e) => setFormData({ ...formData, quiz: { ...formData.quiz, details: e.target.value } })}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Quiz Thumbnail</div>
          <input type="file" accept="image/*" name="quizThumbnail" onChange={(e) => setFormData({ ...formData, quiz: { ...formData.quiz, thumbnail: e.target.files[0] } })} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Quiz HTML</div>
          <input type="file" directory="" webkitdirectory="" multiple onChange={(e) => handleFileUpload(e, 'quiz')} />
        </Grid.Col>

        <Grid.Col span={12}>
          <Button type="submit">Submit Details</Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default InstructionalDesigner;
