import React from 'react';
import '../styles/Message.scss';
import cn from 'classnames';
import { MessageData } from '../types/MessageData';

type Props = {
  message: MessageData,
  username: string
};

export const Message: React.FC<Props> = ({ message, username }) => {
  return (
    <div className={cn('message', message.author === username ? 'message--my' : 'message--other')}>
      <div className="message__text">{message.message}</div>
      <div className="message__meta">
        <p>{`${message.author} ${message.time}`}</p>
      </div>
    </div>
  );
};
