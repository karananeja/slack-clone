import React, { useState } from 'react';
import { Button } from '@mui/material';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import db from '../firebase';
import '../css/ChatInput.css';

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        image: user.photoURL,
        username: user.displayName,
      });
    }
    setInput('');
  };

  return (
    <div className='chatInput'>
      <form>
        <input
          type='text'
          placeholder={`Message #${channelName?.toLowerCase()}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type='submit' onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
