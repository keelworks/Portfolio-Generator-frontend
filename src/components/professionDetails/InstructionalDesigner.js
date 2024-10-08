/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
// src/components/InstructionalDesigner.js
import React from 'react';
import { TextInput, Textarea, Grid, Button, Title, Loader, Alert } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, sendFormData } from '../../reducers/form-reducer';

const InstructionalDesigner = ({ profession }) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form);
  const formStatus = useSelector(state => state.form.status);
  const formError = useSelector(state => state.form.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const updatedFormData = {
      resume: formElements.resume?.files[0] || null,
      portfolioImage: formElements.portfolioImage?.files[0] || null,
      linkedIn: formElements.linkedIn?.value || '',
      email: formElements.email?.value || '',
      behance: formElements.behance?.value || '',
      designPhilosophy: formElements.designPhilosophy?.value || '',
      samplesOfWork: formElements.samplesOfWork?.value || '',
      scenario: formData.scenario,
      softwareSimulation: formData.softwareSimulation,
      workFlow: formData.workFlow,
      quiz: formData.quiz
    };

    dispatch(updateFormData(updatedFormData));
    dispatch(sendFormData(updatedFormData));
    console.log('data from instructionalDesigner', updatedFormData);
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

        dispatch(updateFormData({
          ...formData,
          [section]: {
            ...formData[section],
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
      dispatch(updateFormData({
        ...formData,
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
        {formStatus === 'loading' && (
          <Grid.Col span={12}>
            <Loader />
          </Grid.Col>
        )}
        {formStatus === 'failed' && (
          <Grid.Col span={12}>
            <Alert title="Error" color="red">
              {formError}
            </Alert>
          </Grid.Col>
        )}
        <Grid.Col span={12}>
          <div>Resume</div>
          <input type="file" accept=".pdf,.doc,.docx" name="resume" onChange={(e) => dispatch(updateFormData({ ...formData, resume: e.target.files[0] }))} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Portfolio Image</div>
          <input type="file" accept="image/*" name="portfolioImage" onChange={(e) => dispatch(updateFormData({ ...formData, portfolioImage: e.target.files[0] }))} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="LinkedIn"
            name="linkedIn"
            defaultValue={formData.linkedIn}
            onChange={(e) => dispatch(updateFormData({ ...formData, linkedIn: e.target.value }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Email"
            name="email"
            defaultValue={formData.email}
            onChange={(e) => dispatch(updateFormData({ ...formData, email: e.target.value }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Behance"
            name="behance"
            defaultValue={formData.behance}
            onChange={(e) => dispatch(updateFormData({ ...formData, behance: e.target.value }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Design Philosophy"
            name="designPhilosophy"
            defaultValue={formData.designPhilosophy}
            onChange={(e) => dispatch(updateFormData({ ...formData, designPhilosophy: e.target.value }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Samples of Work"
            name="samplesOfWork"
            defaultValue={formData.samplesOfWork}
            onChange={(e) => dispatch(updateFormData({ ...formData, samplesOfWork: e.target.value }))}
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
            onChange={(e) => dispatch(updateFormData({ ...formData, scenario: { ...formData.scenario, title: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Scenario Details"
            name="scenarioDetails"
            value={formData.scenario.details}
            onChange={(e) => dispatch(updateFormData({ ...formData, scenario: { ...formData.scenario, details: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Scenario Thumbnail</div>
          <input type="file" accept="image/*" name="scenarioThumbnail" onChange={(e) => dispatch(updateFormData({ ...formData, scenario: { ...formData.scenario, thumbnail: e.target.files[0] } }))} />
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
            onChange={(e) => dispatch(updateFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, title: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Software Simulation Details"
            name="softwareSimulationDetails"
            value={formData.softwareSimulation.details}
            onChange={(e) => dispatch(updateFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, details: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Software Simulation Thumbnail</div>
          <input type="file" accept="image/*" name="softwareSimulationThumbnail" onChange={(e) => dispatch(updateFormData({ ...formData, softwareSimulation: { ...formData.softwareSimulation, thumbnail: e.target.files[0] } }))} />
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
            onChange={(e) => dispatch(updateFormData({ ...formData, workFlow: { ...formData.workFlow, title: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Work Flow Details"
            name="workFlowDetails"
            value={formData.workFlow.details}
            onChange={(e) => dispatch(updateFormData({ ...formData, workFlow: { ...formData.workFlow, details: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Work Flow Thumbnail</div>
          <input type="file" accept="image/*" name="workFlowThumbnail" onChange={(e) => dispatch(updateFormData({ ...formData, workFlow: { ...formData.workFlow, thumbnail: e.target.files[0] } }))} />
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
            onChange={(e) => dispatch(updateFormData({ ...formData, quiz: { ...formData.quiz, title: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Quiz Details"
            name="quizDetails"
            value={formData.quiz.details}
            onChange={(e) => dispatch(updateFormData({ ...formData, quiz: { ...formData.quiz, details: e.target.value } }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Quiz Thumbnail</div>
          <input type="file" accept="image/*" name="quizThumbnail" onChange={(e) => dispatch(updateFormData({ ...formData, quiz: { ...formData.quiz, thumbnail: e.target.files[0] } }))} />
        </Grid.Col>
        <Grid.Col span={12}>
          <div>Quiz HTML</div>
          <input type="file" directory="" webkitdirectory="" multiple onChange={(e) => handleFileUpload(e, 'quiz')} />
        </Grid.Col>

        <Grid.Col span={12}>
          <Button type="submit" disabled={formStatus === 'loading'}>Submit Details</Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default InstructionalDesigner;
