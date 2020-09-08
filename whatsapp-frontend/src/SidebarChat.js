import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';

function SidebarChat() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className='sidebarChat__info'>
        <h2>Good bye 2020</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
