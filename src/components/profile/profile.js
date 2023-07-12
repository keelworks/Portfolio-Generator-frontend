import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';

const WelcomePage = () => {
  const user = useSelector((state) => state.currentUser);
  console.log(user);
  return (
    <div style={{display: 'flex', justifyContent: 'center',
      alignItems: 'center', height: '100vh'}}>
      <Typography variant="h4" component="h2">
        welcome：{user.firstName} {user.lastName}
      </Typography>
    </div>
  );
};

export default WelcomePage;
