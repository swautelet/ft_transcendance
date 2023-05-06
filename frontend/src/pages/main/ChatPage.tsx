import React, { useEffect, useState } from 'react';

import Navbar from '../../components/design/Navbar';
import Chat from '../../components/messages/Chat';
import { tokenForm } from '../../interfaceUtils'
import { useNavigate } from 'react-router-dom'
import { getSessionsToken, isSessionTokenSet } from '../../sessionsUtils'
import Loading from '../../components/utils/Loading';
import SocketContextComponent from '../../context/ComponentSocket';

type Props = {};

const ChatPage = (props: Props) => {
  // Authentication
  const [token, setToken] = useState<tokenForm>();
  const [isTokenSet, setIsTokenSet] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Token Logic
  useEffect(() => {
    async function getToken() {
      const sessionToken = await getSessionsToken();
      setToken(sessionToken);
      setIsTokenSet(true)
    }
    if (!isSessionTokenSet()) // '!'token
      navigate('/');
    else
      getToken();
  }, []);
  const chat = <Chat accessToken={token?.accessToken} />;
  return (
    <div className="app bg-gradient-to-tl from-violet-900 via-black to-black w-full overflow-hidden">
      <div className="bg-black flex justify-center items-center px-6 sm:px-16 border-b-2 border-violet-900">
        <div className="xl:max-w-[1280px] w-full">
          <Navbar item={token}/>
        </div>
      </div>
      {token ? (
						<SocketContextComponent children={chat} token={token.accessToken} adress="http://localhost:3001/chat" />
					) : (
						<p>Loading...</p>
					)}
      {/* {token && <Chat accessToken={token.accessToken} />} */}
    </div>
  );
};

export default ChatPage;



















//import React, { useEffect, useState } from 'react'
//import Navbar from '../../components/design/Navbar'
//import Chat from '../../components/messages/Chat'
//import { getSessionsToken, isSessionTokenSet } from '../../sessionsUtils'
//import { tokenForm } from '../../interfaceUtils'
//import { useNavigate } from 'react-router-dom'
//import Loading from '../../components/utils/Loading'
//import jwtDecode from 'jwt-decode';

//type Props = {}

//const ChatPage = (props: Props) => {

//    const [token, setToken] = useState<tokenForm>();
//    const [isTokenSet, setIsTokenSet] = useState(false);
  
//    const navigate = useNavigate();

//    useEffect(() => {
//      async function getToken() {
//        const sessionToken = await getSessionsToken();
//        setToken(sessionToken);
//        setIsTokenSet(true)
//      }
//      if (!isSessionTokenSet()) // '!'token
//        navigate('/');
//    else 
//      getToken();
//    }, []);

//if (!isTokenSet)
//    <Loading />
//else {
//  return (
//    <div className="app bg-gradient-to-tl from-violet-900 via-black to-black w-full overflow-hidden">
//        <div className="bg-black flex justify-center items-center px-6 sm:px-16 border-b-2 border-violet-900">
//          <div className="xl:max-w-[1280px] w-full">
//            <Navbar />
//          </div>
//        </div>
//        <Chat item={{ accessToken: token?.accessToken }}/>
//    </div>
//  )
//}
//}

//export default ChatPage