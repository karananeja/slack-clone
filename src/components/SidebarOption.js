import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import db from '../firebase';
import '../css/SidebarOption.css';

const SidebarOption = ({ addChannelOption, Icon, id, title }) => {
  const history = useHistory();

  const addChannel = () => {
    const channelName = prompt('Please enter the Channel Name');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };

  return (
    <div
      className='sidebarOption'
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className='sidebarOption__icon' />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className='sidebarOption__channel'>
          <span className='sidebarOption__hash'>#</span>
          {title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;
