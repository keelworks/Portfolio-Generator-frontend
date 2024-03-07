/* eslint-disable react/prop-types */
// Footer.js
import React from 'react';
import { Footer as MantineFooter, Text, Anchor, Group, Container } from '@mantine/core';

const Footer = ({ firstName, lastName }) => {
  return (
    <MantineFooter p="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6vh' }}>
      <Container style={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Group position="apart" style={{ width: '100vw', justifyContent: 'space-around' }}>
          <Anchor href="https://linkedin.com/in/johndoe" size="sm" target="_blank" rel="noopener noreferrer">
              LinkedIn
          </Anchor>
          <Anchor href="mailto:johndoe@gmail.com" size="sm">johndoe@gmail.com</Anchor>
          <Anchor href="https://instagram.com/johndoe" size="sm" target="_blank" rel="noopener noreferrer">
              insta
          </Anchor>
          <Anchor href="https://github.com/johndoe" size="sm" target="_blank" rel="noopener noreferrer">
              GitHub
          </Anchor>
        </Group>
        <Text size="sm" style={{ marginTop: '1em' }}>&copy; {new Date().getFullYear()} {firstName} {lastName}</Text>
      </Container>
    </MantineFooter>
  );
};

export default Footer;
