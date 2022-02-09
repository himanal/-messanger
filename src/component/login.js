import { useRef } from "react" ;
import { Button, Container, Form } from "react-bootstrap" ;
import { v4 as uuidv4 } from 'uuid';

const Login = ({onIdSubmit}) => {
    const idRef = useRef()

    const handleSubmit= (e)=>{
        e.preventDefault()
        onIdSubmit(idRef.current.value)
        
    }

    const CreateNewId=()=>{
       
       onIdSubmit(uuidv4())
       
    }
    return (
        <Container className="align-items-center d-flex" style={{ height:'100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    
                    <Form.Label>enter your id</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="mr-2"> login </Button>
                <Button variant="secondary" onClick={CreateNewId} > create a new id </Button>
            </Form>
        </Container>
    )
}

export default Login
