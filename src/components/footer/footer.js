/* eslint-disable react/prop-types */
// Footer.js
import React, { useState } from 'react';
import { Footer as MantineFooter, Text, Anchor, Group, Container } from '@mantine/core';
import ContactModal from '../ContactModal/contactModal';

const Footer = ({ user }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submit action here
    setModalOpened(false); // Close the modal after submit
  };
  return (
    <MantineFooter p="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6vh' }}>
      <Container style={{ maxWidth: '1400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Group position="apart" style={{ width: '100vw', justifyContent: 'space-around', maxWidth: '1400px', padding: '10px'}}>
          <Anchor href="https://linkedin.com/in/johndoe" size="sm" target="_blank" rel="noopener noreferrer">
              LinkedIn
          </Anchor>
          <Anchor size="sm" onClick={() => setModalOpened(true)}>
            {user.email ? user?.email : 'johndoe@gmail.com' }
          </Anchor>
          <ContactModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            onSubmit={handleSubmit}
          />
          <Anchor href="https://github.com/johndoe" size="sm" target="_blank" rel="noopener noreferrer">
              GitHub
          </Anchor>
        </Group>
        <Text size="sm" style={{ marginTop: '1em' }}>&copy;{user?.firstName}{user?.lastName}{new Date().getFullYear()}</Text>
      </Container>
    </MantineFooter>
  );
};

export default Footer;
