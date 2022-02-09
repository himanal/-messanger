import { useRef, useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Contact from "./Contact";
import Conversation from "./Conversation";
import NewcontactModal from "./NewcontactModal";
import NewconversationModal from "./NewconversationModal";


const CONVERSATION_KEY='conversations'
const CONTACTS_KEY='contacts'
const Sidebar = ({ id }) => {
  

    const [activekey,setActivekey]=useState(CONVERSATION_KEY)
    const [ModalOpen,setModalOpen]= useState(false)
    const conversationOpen = activekey ===CONVERSATION_KEY
    function closeModal() {
        setModalOpen(false)
      }


  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activekey} onSelect={setActivekey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
     
     <Tab.Content className="border border-top-0  overflow-auto flex-grow-1">
         <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Conversation />
         </Tab.Pane>
         <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contact />
         </Tab.Pane>
     </Tab.Content>
  

     <div className="border border-primary small p-2 ">
         your id:<span className="text-muted ">{id}</span>
     </div>
     

    <Button onClick={() => setModalOpen(true)} className="rounded-0">
        new {conversationOpen ? "conversation" : "contact"}
    </Button>
      </Tab.Container>

      <Modal show={ModalOpen} onHide={closeModal}>
          {conversationOpen?
          <NewconversationModal closeModal={closeModal} /> :
          <NewcontactModal closeModal={closeModal} />}
      </Modal>
    </div>
  );
};

export default Sidebar;
