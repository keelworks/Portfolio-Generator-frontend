// UserProfileHeader.js
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Header, Group, Title, Button } from '@mantine/core';

const UserProfileHeader = ({ firstName, resumeUrl }) => {
  return (
    <Header height={70} p="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '100vw', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Group style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title order={1}>{firstName.toUpperCase()}</Title>
          <Button component="a" href={resumeUrl} variant="subtle" target="_blank" rel="noopener noreferrer">
            Resume link
          </Button>
        </Group>
      </div>
    </Header>
  );
};

UserProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  resumeUrl: PropTypes.string.isRequired,
};

export default UserProfileHeader;
