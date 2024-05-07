/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
// ProjectCard.js
/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
import React from 'react';

import { Card, Image } from '@mantine/core';

// ProjectCard component
const ProjectCard = ({ project, openProjectModal }) => {
    // const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            shadow="sm"
            padding="lg"
            style={{ marginBottom: '1rem', overflow: 'hidden' }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            onClick={() => openProjectModal(project)}
        >
            <div style={{ position: 'relative' }}>
                <Card.Section >
                    <Image src={project.imageUrl} height={240} alt={project.title} />
                </Card.Section>
                {/* {isHovered && (
                    <Text
                        weight={500}
                        size="md"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        {project.title}
                    </Text>
                )} */}
            </div>
        </Card>
    );
};

export default ProjectCard;
