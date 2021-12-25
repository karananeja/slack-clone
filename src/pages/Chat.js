import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import Message from '../components/Message';
import ChatInput from '../components/ChatInput';
import '../css/Chat.css';

const Chat = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()));
    }

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong>#{roomName ? roomName.name : 'enter a room'}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className='chat__headerRight'>
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className='chat__messages'>
        {messages?.map(({ image, message, timestamp, username }) => (
          <Message
            key={timestamp}
            image={image}
            message={message}
            timestamp={timestamp}
            username={username}
          />
        ))}
      </div>
      <ChatInput channelName={roomName?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
