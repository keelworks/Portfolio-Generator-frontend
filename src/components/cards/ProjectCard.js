/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
// ProjectCard.js
/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
import React from 'react';

import { Card, Image } from '@mantine/core';

// ProjectCard component
const ProjectCard = ({ project, openProjectModal, onHover }) => {
    const handleMouseEnter = () => {
        onHover({ title: project.title, description: project.description });
    };

    const handleMouseLeave = () => {
        onHover({ title: '', description: '' });
    };

    console.log('project', project);

    return (
        <Card
            shadow="sm"
            padding="lg"
            style={{ marginBottom: '1rem', overflow: 'hidden', padding: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => openProjectModal(project)}
        >
            <div style={{ position: 'relative' }}>
                <Card.Section >
                    <Image src={project.imageUrl} height={240} alt={project.title} />
                </Card.Section>
            </div>
        </Card>
    );
};

export default ProjectCard;
