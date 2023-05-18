import React, { useEffect, useState } from 'react';
import '../styles/ChatWindow.scss';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { MessageData } from '../types/MessageData';
import { Message } from './Message';

type Props = {
  socket: Socket,
  room: string,
  username: string,
};

export const ChatWindow: React.FC<Props> = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageData[]>([]);

  useEffect(() => {
    socket.on('receive_message', (messageData) => {
      // eslint-disable-next-line no-console
      console.log(messageData);

      setMessageList(prev => [...prev, messageData]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData: MessageData = {
        message: currentMessage,
        author: username,
        time: new Date(Date.now()).toLocaleTimeString(),
        room,
      };

      await socket.emit('send_message', messageData);
      setMessageList(prev => [...prev, messageData]);
      // setCurrentMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <p className="chat__header-text">{`Chat room #${room}`}</p>
      </div>
      <ScrollToBottom className="chat__body">
        {messageList.map((message) => (
          <Message message={message} username={username} key={message.message} />
        ))}
      </ScrollToBottom>
      <div className="chat__footer">
        <input
          type="text"
          className="message__input"
          value={currentMessage}
          onChange={e => setCurrentMessage(e.target.value)}
          placeholder="Type here..."
          onKeyPress={e => handleKeyPress(e)}
        />
        <button
          type="button"
          className="message__send-button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
