import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    //pusher - getting started codes copied
    const pusher = new Pusher('c175be9807d4a93d5b76', {
      cluster: 'us3',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      setMessages([...messages, newMessages]);
    });

    //helps channel not to get too busy when there are milions of msgs are going back and forth
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className='app'>
      <div className='app__body'>
        <Sidebar />
        <Chat key={messages.id} messages={messages} />
      </div>
    </div>
  );
}

export default App;
