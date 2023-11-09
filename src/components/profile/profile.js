import {
  TextInput, Textarea, Group, Title, Button, Container, Flex,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Text} from '@mantine/core';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserThunk} from '../../services/authorize-thunk';

const WelcomePage = () => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      lastName: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      lastName: (value) => value.trim().length === 0,
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
        firstName: values.name,
        email: values.email,
        lastName: values.lastName,
        message: values.message,
      };
      console.log(user._id);
      // Dispatch an update action - replace with the actual thunk if different
      const action = updateUserThunk({uid: user._id, userData});
      const resultAction = await dispatch(action);
      const updatedUser = resultAction.payload;

      console.log('Update successful: ', updatedUser);
      // Additional actions after successful update can go here
    } catch (error) {
      console.error('Update failed: ', error);
      // Handle update error here
    }
  };

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
            label="Name"
            placeholder={user.firstName}
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
            style={{flex: 1}}
          />
          <TextInput
            label="Email"
            placeholder={user.username}
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
            style={{flex: 1}}
          />
        </Flex>

        <TextInput
          label="lastName"
          placeholder={user.lastName}
          mt="md"
          name="lastName"
          variant="filled"
          {...form.getInputProps('lastName')}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('message')}
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
