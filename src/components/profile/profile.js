import {
  TextInput, Textarea, Group, Title, Button, Container, Flex,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Text} from '@mantine/core';
import {useSelector} from 'react-redux';

const WelcomePage = () => {
  const user = useSelector((state) => state.currentUser);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
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

  // 如果用户存在，显示用户的名字
  return (
    <Container size="md" style={{marginTop: '2rem', marginBottom: '2rem'}}>
      <form onSubmit={form.onSubmit(() => {})}>
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
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
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
            Send message
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default WelcomePage;
