/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findUserByIdThunk } from '../../services/website-thunk';
import { Container, SimpleGrid } from '@mantine/core';
import UserProfileHeader from '../header/header';
import Footer from '../footer/footer';
import ProjectCard from '../cards/ProjectCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectModal from '../projectModal/ProjectModal';

function UserPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userById.user);
  const loading = useSelector((state) => state.userById.loading);

  useEffect(() => {
    if (userId) {
      dispatch(findUserByIdThunk(userId));
    }
  }, [userId, dispatch]);

  const [modalOpened, setModalOpened] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState({ title: '', description: '' });

  const openProjectModal = (project) => {
    setCurrentProject(project);
    setModalOpened(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  
  const projects = [
    {
      title: 'Scenario',
      description: 'A brief description of Project One.',
      imageUrl: 'https://picsum.photos/600',
      link: 'https://ioflood.com/blog/java-classes/',
      html: (
        <div>
          <h1>Scenario</h1>
          <p>This is a detailed description inside the div.</p>
        </div>
      ),
    },
    {
      title: 'Software Simulation',
      description: 'An overview of Project Two.',
      imageUrl: 'https://picsum.photos/400',
      link: 'https://ioflood.com/blog/java-classes/',
      html: "",
    },
    {
      title: 'Role Over',
      description: 'Details about Project Three.',
      imageUrl: 'https://picsum.photos/600',
      link: '#',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter Example</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <h1>Counter Example</h1>
    <p>Button clicked <span id="counter">0</span> times</p>
    <button id="incrementButton">Click Me</button>

    <script src="scripts/counter.js"></script>
</body>
</html>`,
      css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}

h1 {
    color: #333;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #008cba;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
}

button:hover {
    background-color: #005f5f;
}

p {
    font-size: 18px;
}`,
      js: `document.addEventListener('DOMContentLoaded', (event) => {
    let counter = 0;

    const counterDisplay = document.getElementById('counter');
    const incrementButton = document.getElementById('incrementButton');

    incrementButton.addEventListener('click', () => {
        counter++;
        counterDisplay.textContent = counter;
    });
}); `,
    },
    {
      title: 'Quiz',
      description: 'What Project Four is all about.',
      imageUrl: 'https://picsum.photos/800',
      link: '#',
      html: "<div><h1>Quiz </h1></div>",
    }
  ];

  return (
    <>
      <UserProfileHeader firstName={user?.firstName} resumeUrl={user?.resumeUrl} />
      <div className='container-userPage'>
        <Container size={'responsive'}
          style={{ alignItems: 'center', width: '100vw', maxWidth: '1400px' }}>

          <div className="container-userProfile">
            <div className="profile">
              <img src="https://fakeimg.pl/500/" alt="Profile" className="profile-image" />
            </div>
            <div className="content">
              <div className="section">
                <h1>Design Philosophy</h1>
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="section">
                <h1 size="lg" style={{ marginBottom: '1rem' }}>{hoveredProject.title || 'Samples Of Work'}</h1>
                <p size="sm" style={{ marginBottom: '20px', minHeight: '20px' }}>
                  {hoveredProject.description || 'Hover over a project to see its description.'}
                </p>
              </div>
            </div>
          </div>

          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: 1080, cols: 2 },
              { maxWidth: 860, cols: 1 },
              { maxWidth: 600, cols: 1 },
            ]}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                openProjectModal={openProjectModal}
                onHover={setHoveredProject}
              />
            ))}
          </SimpleGrid>

          {currentProject && (
            <ProjectModal
            project={currentProject}
            projects={projects} // Pass the entire projects array
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
          />
          )}
        </Container>
      </div>
      <Footer firstName={user?.firstName} lastname={user?.lastname} />
    </>
  );
}

export default UserPage;
