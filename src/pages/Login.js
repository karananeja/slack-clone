import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import '../css/Login.css';
import { useStateValue } from '../StateProvider';

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: 'SET_USER',
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt='slack logo'
        />
        <h2>Sign In to Slack</h2>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
