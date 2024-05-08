/* eslint-disable react/prop-types */
// ContactModal.js
import React from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';

const ContactModal = ({ opened, onClose, onSubmit }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Contact me"
    >
      <form onSubmit={onSubmit}>
        <TextInput label="Full Name" placeholder="Your name" required />
        <TextInput label="Email" placeholder="Your email" required />
        <TextInput label="Message" placeholder="Enter your message" required />
        <Group position="right" mt="md">
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button type="submit">Send</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ContactModal;
