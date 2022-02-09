import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useContacts } from '../context/contactsPorvider'

const Contact = () => {
    

    const {contacts}= useContacts()
    return (
        <ListGroup variant='flush'>
           {contacts.map(contact=>(
               <ListGroupItem key={contact.id}>
                   {contact.name}
               </ListGroupItem>
           ))} 
        </ListGroup>
    )
}

export default Contact
