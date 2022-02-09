import React, { useRef } from 'react'
import {Modal,Form, Button} from 'react-bootstrap'
import { useContacts } from '../context/contactsPorvider'



const NewcontactModal = ({closeModal}) => {
    const idRef =useRef()
    const nameRef =useRef()
    const {creatContact} =useContacts()
    const handleSubmit=(e)=>{
        e.preventDefault()

        creatContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }
    return (
        <div>
           <Modal.Header closeButton > create contact</Modal.Header>
           <Modal.Body>
               <Form onSubmit={handleSubmit}>
                   <Form.Group>
                       <Form.Label>id</Form.Label>
                       <Form.Control type='text' ref={idRef} required/>
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>name</Form.Label>
                       <Form.Control type='text' ref={nameRef} required/>
                   </Form.Group>
                   <Button type='submit'> create contact</Button>
               </Form>
           </Modal.Body>
        </div>
    )
}

export default NewcontactModal
