import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


function App() {
  const [id , setId]=useLocalStorage()

  

  return (
     
    <>
    {id} 
      <Login onIdSubmit={setId} />
      
    </>
  
  );
}

export default App;
