import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import { useConversations } from "../context/conversationProvider";

function OpenConversation() {
  const [text, setText] = useState("");
  
  const { sendMessage ,selectedConversation} =useConversations()
  const handleSubmit =(e)=>{
      e.preventDefault()


      sendMessage(
        selectedConversation.recipients.map(r => r.id),
          text
          )
          setText('')

  }
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  return (
    <div className=" d-flex flex-column flex-grow-1">
     

      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index)=>{
             const lastMessage = selectedConversation.messages.length - 1 === index
            return(
             <div 

               ref={lastMessage ? setRef : null}
             key={index}
             className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
             
             >
               <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                {message.text}_
               </div>
               <div className={`text-muted  small ${message.fromMe ? 'text-right': ''}`}>{message.fromMe ? "you" : message.senderName}</div>
             </div> 
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />

            <Button type="Submit" >send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}

export default OpenConversation;
