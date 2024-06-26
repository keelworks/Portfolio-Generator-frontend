/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, SimpleGrid, Text, Image } from '@mantine/core';
import ProjectCard from '../cards/ProjectCard';
const SamplesOfWork = ({ projects, openProjectModal }) => {
   const [hoveredDescription, setHoveredDescription] = useState('');

    return (
        <div>
            <Text weight={500} size="lg" style={{ marginBottom: '1rem' }}>Samples of my Work:</Text>
            <Text size="sm" style={{ marginBottom: '20px', minHeight: '20px' }}>
                {hoveredDescription || 'Hover over a project to see its description.'}
            </Text>
            <SimpleGrid
                cols={4} // Default to 4 columns on large screens
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
                        setHoveredProject={setHoveredDescription}
                    />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default SamplesOfWork;
