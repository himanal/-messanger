import React, { useState } from 'react'
import { Button, Form, FormCheck, FormGroup, Modal } from 'react-bootstrap'

import {  useContacts } from '../context/contactsPorvider'
import {useConversations} from '../context/conversationProvider'

const NewconversationModal = ({closeModal}) => {
    const [selectedContactsId, setselectedContactsId]=useState([])
    const {contacts}=useContacts()
    const {createConversation}=useConversations()

    const handleCheckboxChange=(contactId)=>{
        setselectedContactsId(prevselectedContactIds=>{
            if(prevselectedContactIds.includes(contactId)){
                return prevselectedContactIds.filter(prevId=>{
                    return contactId !== prevId
                })
            }else{
                return[...prevselectedContactIds, contactId]
            }
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        createConversation(selectedContactsId)
        closeModal()
    }
    return (
        <div>
        <Modal.Header closeButton > create conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact=>(
                    <FormGroup controlId={contact.id} key={contact.id}>
                      <FormCheck type='checkbox' value={selectedContactsId.includes(contact.id)} label={contact.name} onChange={()=> handleCheckboxChange(contact.id)} />
                    </FormGroup>
                ))}
                <Button type='submit'> create contact</Button>
            </Form>
        </Modal.Body>
     </div>
    )
}

export default NewconversationModal
