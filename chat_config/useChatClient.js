// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId, chatUserName, chatUserToken } from './chatConfig';
import { getAuth} from 'firebase/auth';




// const user = {
//   id: chatUserId,
//   name: chatUserName,
// };

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
      
      const auth = getAuth()
      const fbUser = auth.currentUser;
      const userName = fbUser.displayName
      const userID = userName.replace(/ /g,"_") + '_' + fbUser.uid
      const email = fbUser.email
      console.log(userName)
      console.log(userID)
      const user = {
        id: userID,
        name: userName,
      };
        //get name and userID
        chatClient.connectUser(user, chatClient.devToken(userID));
        chatClient.upsertUser({id: userID,
        name: userName,
        email: email})
        setClientIsReady(true);

        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};
