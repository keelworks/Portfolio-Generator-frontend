import {Text} from '@mantine/core';
import {useSelector} from 'react-redux';

const WelcomePage = () => {
  const user = useSelector((state) => state.currentUser);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Text align="center" size="xl">  {/* 使用 align 和 size 调整文本的对齐和大小 */}
        welcome: {user.firstName} {user.lastName}
      </Text>
    </div>
  );
};

export default WelcomePage;
