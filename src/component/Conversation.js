import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useConversations } from "../context/conversationProvider";

const Conversation = () => {

  const { conversations ,selecteConversationIndex} = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroupItem
          key={index}
          action
          onClick={() => selecteConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r) => r.name).join(",")}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Conversation;
