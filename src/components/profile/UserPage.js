import {useParams} from 'react-router-dom';

// eslint-disable-next-line require-jsdoc
function UserPage() {
  const {userId} = useParams();

  // 这里你可以根据firstname来渲染相应的内容
  return <div>Hello, {userId}</div>;
}

export default UserPage;
