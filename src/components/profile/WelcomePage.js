/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  TextInput,
  Textarea,
  Group,
  Title,
  Button,
  Container,
  Flex,
  NativeSelect,
  Avatar,
  FileInput,
  Modal,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from '../../services/authorize-thunk';
import firebase from '../../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfession } from '../../reducers/authorize-reducer'; // import the action

const WelcomePage = () => {
  const [avatar, setAvatar] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleAvatarChange = (e) => {
    setAvatar(e);
  };

  const handleAvatarClick = () => {
    setIsViewerOpen(true);
  };

  const uploadAvatar = async () => {
    if (!avatar) return user.avatarUrl;
    const storage = getStorage(firebase);
    const storageRef = ref(storage, 'avatars/' + avatar.name);
    await uploadBytes(storageRef, avatar);
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o?name=${encodeURIComponent(storageRef.name)}`;
    const response = await fetch(corsProxy + url);
    const data = await response.json();
    return data.mediaLink;
  };

  const form = useForm({
    initialValues: {
      avatarUrl: user?.avatarUrl || '',
      resumeUrl: user?.resumeUrl || '',
      firstname: user?.firstName || '',
      lastName: user?.lastName || '',
      profession: user?.profession || '',
      bio: user?.bio || '',
      email: user?.email || '',
    },
    validate: {
      firstname: (value) => value.trim().length < 2 ? 'First name must have at least 2 characters' : null,
      lastName: (value) => value.trim().length === 0 ? 'Last name is required' : null,
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Invalid email address', // Add email validation
    },
  });

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <Text align="center" size="xl">
          Welcome, Guest!
        </Text>
      </div>
    );
  }

  const handleSubmit = async (values) => {
    try {
      console.log('Form values:', values);
      const avatarUrl = await uploadAvatar();
      const userData = {
        firstName: values.firstname,
        lastName: values.lastName,
        profession: values.profession,
        bio: values.bio,
        avatarUrl: avatarUrl,
        email: values.email, // Add email to submission data
      };
      // Dispatch an update action - replace with the actual thunk if different
      const action = updateUserThunk({ uid: user.id, userData });
      const resultAction = await dispatch(action);
      const updatedUser = resultAction.payload;

      console.log('Update successful: ', updatedUser);
      alert('You have successfully saved!');
    } catch (error) {
      console.error('Update failed: ', error);
    }
  };

  const handleProfessionChange = (event) => {
    dispatch(updateProfession(event.currentTarget.value));
    form.setFieldValue('profession', event.currentTarget.value);
  };

  return (
    <Container size="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Modal opened={isViewerOpen} onClose={() => setIsViewerOpen(false)}>
        <img src={form.values.avatarUrl} alt="Avatar" style={{ width: '100%' }} />
      </Modal>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Profile Information
        </Title>

        <Flex style={{ marginTop: '1rem', gap: '1rem' }}>
          <Flex style={{ flex: 1, alignItems: 'center', gap: '1rem' }}>
            <Avatar
              src={form.values.avatarUrl}
              size="lg"
              radius="sm"
              style={{ cursor: 'pointer', height: '100%' }}
              onClick={handleAvatarClick}
            />
            <FileInput
              clearable
              variant="filled"
              label="Change new photo"
              placeholder=".jpg .Png are acceptable"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ flex: 1, width: 50 }}
            />
          </Flex>
        </Flex>
        <Flex style={{ marginTop: '1rem', gap: '1rem' }}>
          <TextInput
            label="FirstName"
            name="firstname"
            variant="filled"
            {...form.getInputProps('firstname')}
            style={{ flex: 1 }}
          />

          <TextInput
            label="LastName"
            name="lastName"
            variant="filled"
            {...form.getInputProps('lastName')}
            style={{ flex: 1 }}
          />
        </Flex>
        <Flex style={{ marginTop: '1rem', gap: '1rem' }}>
          <TextInput
            label="Email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
            style={{ flex: 1 }}
          />
        </Flex>
        <Flex style={{ marginTop: '1rem', gap: '1rem' }}>
          <NativeSelect
            label="Profession"
            name="profession"
            variant="filled"
            {...form.getInputProps('profession')}
            data={
              ['Instructional Designer', 'UI/UX Designer', 'Graphics Designer']
            }
            onChange={handleProfessionChange}
            style={{ flex: 1 }}
          />
        </Flex>
        <Textarea
          mt="md"
          label="Practice Philosophy"
          placeholder="Practice Philosophy"
          maxRows={10}
          minRows={5}
          autosize
          name="bio"
          variant="filled"
          {...form.getInputProps('bio')}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Submit
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default WelcomePage;
