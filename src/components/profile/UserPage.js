/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {findUserByIdThunk} from '../../services/website-thunk';
import { Container, Text, Image, Button, Card, Group } from '@mantine/core';

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProfileHeader from '../header/header';
import Footer from '../footer/footer';

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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const projects = [
    {
      title: 'Project One',
      description: 'A brief description of Project One.',
      imageUrl: 'path/to/project-one-image.jpg',
      link: '#'
    },
    {
      title: 'Project Two',
      description: 'An overview of Project Two.',
      imageUrl: 'path/to/project-two-image.jpg',
      link: '#'
    },
    {
      title: 'Project Three',
      description: 'Details about Project Three.',
      imageUrl: 'path/to/project-three-image.jpg',
      link: '#'
    },
    {
      title: 'Project Four',
      description: 'What Project Four is all about.',
      imageUrl: 'path/to/project-four-image.jpg',
      link: '#'
    }
  ];

  return (
    <Container>
        <Group position="center" direction="column" spacing="xl">
          <Image
            src={user.avatarUrl || 'path/to/default-avatar.jpg'}
            alt={`${user.firstName} ${user.lastName}`}
            style={{ width: 200, height: 200, borderRadius: '50%' }}
          />
          <Text align="center" weight={700} size="xl">
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text align="center">{user.designPhilosophy}</Text>
        </Group>
        <Text align="center" weight={700} size="xl" style={{ margin: '2rem 0' }}>
          My Works
        </Text>
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div key={index}>
              <Card
              key={index}
              shadow="sm"
              padding="lg"
              style={{ minWidth: '300px', margin: '0 16px' }}
            >
              <Image src={projects.imageUrl} alt={projects.title} height={160} />
              <Text weight={500} size="lg" style={{ marginTop: '1rem' }}>
                {projects.title}
              </Text>
              <Text size="sm">{projects.description}</Text>
              <Button
                component="a"
                href={projects.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '1rem' }}
              >
                View Project
              </Button>
            </Card>
            </div>
          ))}
        </Slider>
      </Container>
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
      style={{ ...style, display: 'block', background: 'inherit' }}
      onClick={onClick}
    />
  );
}

export default UserPage;
