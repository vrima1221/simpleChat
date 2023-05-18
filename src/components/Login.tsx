import React from 'react';
import '../styles/Login.scss';

type Props = {
  name: string,
  setName: (input: string) => void,
  room: string,
  setRoom: (input: string) => void,
  onJoin: () => void
};

export const Login: React.FC<Props> = ({
  name,
  setName,
  room,
  setRoom,
  onJoin,
}) => {
  return (
    <div className="login">
      <input
        type="text"
        className="login__input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Input your username"
        required
      />

      <input
        type="text"
        className="login__input"
        value={room}
        onChange={e => setRoom(e.target.value)}
        placeholder="Input room id"
        required
      />

      <button
        type="button"
        className="login__button"
        onClick={onJoin}
      >
        Join a room
      </button>
    </div>
  );
};
