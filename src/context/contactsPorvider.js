import React, { useContext} from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage'

const contactcontext = React.createContext()


export function ContactsProvider ({children})  {
    const [contacts, setContacts]= UseLocalStorage('contacts',[])
    function creatContact(id,name){
        setContacts(prevcontacts=>{
            return [ ...prevcontacts, {id, name}]
        })
        
    }
    return (
        <contactcontext.Provider value={{contacts , creatContact}} >
            {children}
        </contactcontext.Provider >
    )
}



export function useContacts(){
    return useContext(contactcontext)
}