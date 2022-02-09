import React, { useCallback, useContext, useEffect, useState } from "react";
import UseLocalStorage from "../hooks/UseLocalStorage";
import { useContacts } from "./contactsPorvider";
import { useSocket } from "./socketProvider";

const conversationscontaxt = React.createContext();

export function ConversationsProvider({ id, children }) {
  const [conversations, setCoversations] = UseLocalStorage("conversations", []);
  const { contacts } = useContacts();
  const [selecteConversationIndex   , setSelectedConversationIndex] = useState(0);
  const socket = useSocket()
  function createConversation(recipients) {
    setCoversations((prevConversation) => {
      return [...prevConversation, { recipients, messages: [] }];
    });
  }
  const addMessageToconversation=useCallback(({recipients ,text ,sender})=>{
    setCoversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })
        if (madeChange) {
          return newConversations
        } else {
          return [
            ...prevConversations,
            { recipients, messages: [newMessage] }
          ]
        }
      })},[setCoversations])
 
   useEffect(()=>{
     if( socket == null) return
     socket.on('recevie-meassge', addMessageToconversation)
     return()=> socket.off('recevie-meassge')
   },[socket, addMessageToconversation])
  function sendMessage(recipients, text){
    socket.emit('send-message',{recipients, text} )

    addMessageToconversation({recipients ,text ,sender:id})
  }
  const formattedconversation = conversations.map((conversation,index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const messages =conversation.messages.map(message =>{
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe =id === message.sender
      return{ ...message, senderName: name , fromMe}

     
    })
    const selected = index === selecteConversationIndex
    return { ...conversation, messages,recipients , selected };
  });
  const value = {
    conversations: formattedconversation,
    selectedConversation: formattedconversation
    [selecteConversationIndex],
    sendMessage,
    selecteConversationIndex: setSelectedConversationIndex,
    createConversation,
  };
  return (
    <conversationscontaxt.Provider value={value}>
      {children}
    </conversationscontaxt.Provider>
  );
}

export function useConversations() {
  return useContext(conversationscontaxt);
}
function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}