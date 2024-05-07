/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {findUserByIdThunk} from '../../services/website-thunk';
import { Container, Text, Image, Group, Card, SimpleGrid } from '@mantine/core';
import UserProfileHeader from '../header/header';
import Footer from '../footer/footer';
import ProjectCard from '../cards/ProjectCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectModal from '../projectModal/ProjectModal';
import WorkSamples from '../workSamples/WorkSamples';

// eslint-disable-next-line require-jsdoc
function UserPage() {
  const {userId} = useParams();
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

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const projects = [
    {
      title: 'Project One',
      description: 'A brief description of Project One.',
      imageUrl: 'https://picsum.photos/200',
      link: '#',
      details: [
        { src: 'https://picsum.photos/400', title: 'Image Title 1' },
        { src: 'https://picsum.photos/200', title: 'Image Title 2' },
        { src: 'https://picsum.photos/600', title: 'Image Title 3' },
        { src: 'https://picsum.photos/800', title: 'Image Title 3' },
      ],
    },
    {
      title: 'Project Two',
      description: 'An overview of Project Two.',
      imageUrl: 'https://picsum.photos/400',
      link: '#',
      details: [
        { src: 'https://picsum.photos/400', title: 'Image Title 1' },
        { src: 'https://picsum.photos/200', title: 'Image Title 2' },
        { src: 'https://picsum.photos/600', title: 'Image Title 3' },
        { src: 'https://picsum.photos/800', title: 'Image Title 3' },
      ],
    },
    {
      title: 'Project Three',
      description: 'Details about Project Three.',
      imageUrl: 'https://picsum.photos/600',
      link: '#',
      details: [
        { src: 'https://picsum.photos/400', title: 'Image Title 1' },
        { src: 'https://picsum.photos/200', title: 'Image Title 2' },
        { src: 'https://picsum.photos/600', title: 'Image Title 3' },
        { src: 'https://picsum.photos/800', title: 'Image Title 3' },
      ],
    },
    {
      title: 'Project Four',
      description: 'What Project Four is all about.',
      imageUrl: 'https://picsum.photos/800',
      link: '#',
      details: [
        { src: 'https://picsum.photos/400', title: 'Image Title 1' },
        { src: 'https://picsum.photos/200', title: 'Image Title 2' },
        { src: 'https://picsum.photos/600', title: 'Image Title 3' },
        { src: 'https://picsum.photos/800', title: 'Image Title 3' },
      ],
    }
  ];


  // Component for displaying samples of work
  const SamplesOfWork = () => (
    <div>
      <Text weight={500} size="lg" style={{ marginBottom: '1rem' }}>Samples of my Work:</Text>
      <SimpleGrid cols={4}>
        {projects.map((project, index) => (
          <Card key={index} shadow="sm" padding="lg" style={{ marginBottom: '1rem' }} onClick={() => openProjectModal(project)}>
            <Card.Section>
              <Image src={project.imageUrl} height={240} alt={project.title} />
            </Card.Section>
            {/* <Text weight={500} size="md">{project.title}</Text>
            <Text size="sm">{project.description}</Text> */}
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );

  console.log("user", user);


  return (
    <>
      <UserProfileHeader firstName={user.firstName} resumeUrl={user.resumeUrl} />
      <div className='container-userPage'>
        <Container size={'responsive'}
          style={{alignItems: 'center',
            width: '100vw', maxWidth: '1400px'
          }}>
          {/* <Group position="center" direction="column" spacing="xl">
            <Image
              src={user.avatarUrl || 'path/to/default-avatar.jpg'}
              alt={`${user.firstName} ${user.lastName}`}
              style={{ width: 200, height: 200, borderRadius: '50%' }}
            />
            <Text align="center" weight={700} size="xl">
              {`${user.firstName} ${user.lastName}`}
            </Text>
          </Group> */}
          <div className="container-userProfile">
            <div className="profile">
              <img src="https://fakeimg.pl/500/" alt="Profile" className="profile-image"/>
            </div>
            <div className="content">
              <div className="section">
                <h1>Design Philosophy:</h1>
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
              <div className="section">
                <h1>Samples of my Work:</h1>
                <p>Below are four different samples...</p>
                {/* Replace with actual links or components that render your work */}
              </div>
            </div>
          </div>


          {/* Insert Samples of My Work Section */}
          {/* <SamplesOfWork /> */}
          <WorkSamples projects={projects} openProjectModal={openProjectModal} />
          {/* <div style={{ padding: '3rem 0' }}>
            <Text align="left" weight={700} size="xl" style={{ margin: '2rem 0' }}>
              My Works
            </Text>
            <Slider {...settings} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {projects.map((project, index) => ( // Updated: Fixed mapping to use 'project' variable
                <div key={index} onClick={() => openProjectModal(project, project.imageUrl)}>
                <ProjectCard key={index} project={project} />
              </div>
            ))}
            </Slider>
          </div> */}
          {currentProject && (
            <ProjectModal
              project={currentProject}
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
              settings={settings}
            />
          )}
        </Container>
      </div>
      <Footer firstName={user.firstName} lastname={user.lastname} />
      </>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'grey' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  );
}

export default UserPage;
