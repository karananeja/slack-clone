import React, { useEffect, useState } from 'react';
import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import SidebarOption from './SidebarOption';
import db from '../firebase';
import '../css/Sidebar.css';

const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('rooms')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__info'>
          <Link to='/'>
            <h2>{user?.displayName}</h2>
          </Link>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </div>
        <Create />
      </div>
      <SidebarOption Icon={InsertComment} title='Threads' />
      <SidebarOption Icon={Inbox} title='Mentions & Reactions' />
      <SidebarOption Icon={Drafts} title='Saved Items' />
      <SidebarOption Icon={BookmarkBorder} title='Channel browser' />
      <SidebarOption Icon={PeopleAlt} title='People & user groups' />
      <SidebarOption Icon={Apps} title='Apps' />
      <SidebarOption Icon={FileCopy} title='File browser' />
      <SidebarOption Icon={ExpandLess} title='Show less' />
      <hr />
      <SidebarOption Icon={ExpandMore} title='Channels' />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title='Add Channel' />
      {channels.map((channel) => (
        <SidebarOption key={channel.id} title={channel.name} id={channel.id} />
      ))}
    </div>
  );
};

export default Sidebar;
