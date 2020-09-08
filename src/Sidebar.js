import React from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

function Sidebar() {
  return (
    <div className='sidebar'>
      {/* sidebar__header */}
      <div className='sidebar__header'>
        <Avatar src='https://user-images.githubusercontent.com/58324084/92429811-f397b800-f147-11ea-99e1-baf82bc3d033.jpg' />
        <div className='sidebar__headerRight'></div>
        {/* iconbutton makes inside icons clickable */}
        <IconButton>
          <DonutLargeIcon />
        </IconButton>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
      {/* sidebar__search */}
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' type='text' />
        </div>
      </div>
      {/* sidebar__chats */}
      <div className='sidebar__chats'>
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
