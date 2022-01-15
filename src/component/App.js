import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function App() {
  const [id , setId]=useState()

  

  return (
     
    <>
    {id} 
      <Login onIdSubmit={setId} />
      
    </>
  
  );
}

export default App;
