import {useParams} from 'react-router-dom';

// eslint-disable-next-line require-jsdoc
function UserPage() {
  const {firstname} = useParams();

  // 这里你可以根据firstname来渲染相应的内容
  return <div>Hello, {firstname}</div>;
}

export default UserPage;
