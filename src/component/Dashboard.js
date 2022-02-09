import React from 'react'
import { useConversations } from '../context/conversationProvider'
import OpenConversation from './openConversation'
import Sidebar from './Sidebar'

const Dashboard = ({id}) => {
  const {selectedConversation} =useConversations()
    return (

        <div className='d-flex' style={{height:"100vh"}}>
            
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
        </div>
    )
}

export default Dashboard