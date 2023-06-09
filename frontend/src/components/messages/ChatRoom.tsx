import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import SendMessage from './SendMessage';
import { Socket } from 'socket.io-client';
import { ChatRoomInterface, ProfileInterface } from './types';
import Participants from './Participants';
import Loading from '../utils/Loading';
import { ISocketContextState } from '../../context/Socket';

type Props = {
  profileId: number;
  roomId: number;
  socket: Socket | undefined;
  token: string | undefined;
  statusocket: ISocketContextState;
};

const ChatRoom = ({ profileId, roomId, socket, token, statusocket }: Props) => {

  const [isBanned, setIsBanned] = useState(false);
  const [users, setUsers] = useState<ProfileInterface[]>([]);

  useEffect(() => {
    const status_handler = (stat: number[]) => {
      setUsers(prevFriends => prevFriends.map((friend, index) => {
        return {
          ...friend,
          statusid: stat[index]
        };
      }));
    }
    statusocket.socket?.on('status', status_handler);

    const intervalId = setInterval(() => {
      let user:string[] = [];
      for (let i = 0; i < users.length; i++){
        user.push(users[i].username);
      }
      statusocket.socket?.emit('get status', user);
    }, 2000);

    // Cleanup function to remove the 'status' event listener
    return () => {
      statusocket.socket?.off('status', status_handler);
      clearInterval(intervalId);
    }
  }, [users, statusocket.socket]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/chatroom/${roomId}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching the conversation:', error);
      }
    };
    fetchUsers();
  }, [roomId]);

  const fetchIsBan = async () => {
    const auth = 'Bearer ' + token;
    const url = `http://localhost:3001/chatroom/is_banned/${roomId}`;
       await fetch(url, { method: 'GET', headers: { Authorization: auth } }
       ).then(res => res.json()
       ).then(response => {
           if (response.statusCode >= 400) {
            console.log("error")
          }
          else
            console.log(response)
            if (response)
              setIsBanned(true)
            else
              setIsBanned(false)
        })
  };


  useEffect(() => {
    fetchIsBan();
  }, []);


  if (profileId == 0) {
    return (<Loading />)
    }
  else if (isBanned) {
    return (
      <div>You are banned from this conversation</div>
        )
  }
  else {
  return (
    <div className="bg-gradient-to-tl from-violet-900 via-slate-900 to-violet-900 relative w-2/3 p-3 rounded-lg flex flex-col h-full">
      <Participants roomId={roomId} profileId={profileId} users={users}/>
      <hr className="w-auto h-1 mx-5 my-2 border-0 rounded dark:bg-gray-900" />
      <div className="flex-grow overflow-y-auto">
        <ChatBox roomId={roomId} socket={socket} token={token} profileId={profileId}/>
      </div>
      <SendMessage roomId={roomId} socket={socket} profileId={profileId} statusocket={statusocket} users={users} />
    </div>
  );
  }
};

export default ChatRoom;
