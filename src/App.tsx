import React, { useEffect, useState } from 'react';
import './App.scss';
import { io } from 'socket.io-client';
import { Login } from './components/Login';
import { ChatWindow } from './components/ChatWindow';

const socket = io('https://simplechat1.herokuapp.com');

export const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  const joinRoom = () => {
    if (!username || !room) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);

      return;
    }

    socket.emit('join_room', room);
    setShowChat(true);
  };

  return (
    <div className="starter">
      {!showChat ? (
        <Login
          name={username}
          setName={setUsername}
          room={room}
          setRoom={setRoom}
          onJoin={joinRoom}
        />
      ) : (
        <ChatWindow
          room={room}
          username={username}
          socket={socket}
        />
      )}

      {error && (
        <h1>Error</h1>
      )}

    </div>
  );
};
