import React from 'react';
import '../css/Message.css';

const Message = ({ image, message, timestamp, username }) => {
  return (
    <div className='message'>
      <img className='message__image' src={image} alt={username} />
      <div className='message__info'>
        <h4>
          {username}{' '}
          <span className='message__timestamp'>
            {new Date(timestamp?.toDate()).toLocaleTimeString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
