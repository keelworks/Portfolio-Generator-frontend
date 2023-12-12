import {
  TextInput, Textarea, Group, Title, Button, Container, Flex, NativeSelect,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Text} from '@mantine/core';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserThunk} from '../../services/authorize-thunk';
import {IconBrandLinkedin} from '@tabler/icons-react';

const WelcomePage = () => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      firstname: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      profession: user?.profession || '',
      bio: user?.bio || '',
      experience: user?.experience|| '',
      location: user?.location || '',
      linkedin: user?.linkedin || '',
    },
    validate: {
      firstname: (value) => value.trim().length < 2,
      lastName: (value) => value.trim().length === 0,
      email: (value) => !/^\S+@\S+$/.test(value),
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
      // Prepare the data to be sent based on your API requirements
      const userData = {
        firstName: values.firstname,
        lastName: values.lastName,
        email: values.email,
        profession: values.profession,
        bio: values.bio,
        experience: values.experience,
        location: values.location,
        linkedin: values.linkedin,
      };
      // Dispatch an update action - replace with the actual thunk if different
      const action = updateUserThunk({uid: user._id, userData});
      const resultAction = await dispatch(action);
      const updatedUser = resultAction.payload;

      console.log('Update successful: ', updatedUser);
      // Additional actions after successful update can go here
      alert('You already successfully saved!');
    } catch (error) {
      console.error('Update failed: ', error);
      // Handle update error here
    }
  };
  // const linkedinicon=<IconBrandLinkedin style={{width: rem(16),
  //   height: rem(16)}} />;

  // 如果用户存在，显示用户的名字
  return (
    <Container size="md" style={{marginTop: '2rem', marginBottom: '2rem'}}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={2}
          size="h1"
          style={{fontFamily: 'Greycliff CF, var(--mantine-font-family)'}}
          fw={900}
          ta="center"
        >
          your information
        </Title>

        <Flex style={{marginTop: '1rem', gap: '1rem'}}>
          <TextInput
            label="FirstName"
            name="firstname"
            variant="filled"
            {...form.getInputProps('firstname')}
            style={{flex: 1}}
          />

          <TextInput
            label="LastName"

            name="lastName"
            variant="filled"
            {...form.getInputProps('lastName')}
            style={{flex: 1}}
          />
        </Flex>
        <Flex style={{marginTop: '1rem', gap: '1rem'}}>
          <TextInput
            label="Email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
            style={{flex: 1}}
          />
          <NativeSelect
            label="Profession"
            name="profession"
            variant="filled"
            {...form.getInputProps('profession')}
            data={
              ['Instructional Designer', 'UI/UX Designer', 'Graphics Designer']
            }
            style={{flex: 1}}
          />
        </Flex>

        <Flex style={{marginTop: '1rem', gap: '1rem'}}>
          <NativeSelect
            label="Experience"
            name="experience"
            variant="filled"
            {...form.getInputProps('experience')}
            data={
              ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']
            }
            style={{flex: 1}}
          />

          <TextInput
            label="Location"
            name="location"
            variant="filled"
            {...form.getInputProps('location')}
            style={{flex: 1}}
          />
        </Flex>
        <TextInput
          label="LinkedIn Profile URL"
          icon={<IconBrandLinkedin/>}
          mt="md"
          name="linkedin"
          variant="filled"
          {...form.getInputProps('linkedin')}
        />

        <Textarea
          mt="md"
          label="bio"
          placeholder="Your message"
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
