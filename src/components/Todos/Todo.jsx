import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { todosTypesCheck } from "../../helpers/helpers";
import axios from "axios";



const Todo = () => {
  const [todo, setTodo ] = useState([])
  const [input, setInput ] = useState({
    title : "",
    type: "Pending"
  })

  // input fields 
    const handleInputChange = (e) => {
       setInput((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
       }))
    }

    // get all todos
    const getAllTodos = async () => {
      const response =  await axios.get("http://localhost:5000/todos")
      setTodo(response.data);

    }

    // add todo 
    const handleTodoAdd = async() => {
      await axios.post("http://localhost:5000/todos", input)
      getAllTodos();
      setInput({
         title: "",
         type : "Pending"
      })
    }
    // delete todo 
    const handleTodoDelete = async (id) => {
       await axios.delete(`http://localhost:5000/todos/${id}`)
       getAllTodos();
    }

    useEffect(() => {
      getAllTodos();
    }, [])

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={5}> 
          <Card > 
          <h2 className="text-center"> Add Your Todo</h2>
          <div className="todo-app d-flex p-3">          
             <div className="my-3">
                <input type="text" className="form-control" placeholder="Todo Name" name="title" value={input.title} onChange={handleInputChange}/>
             </div> &nbsp;
             <div className="my-3"  style={{width: "250px"}}>              
                <select className="form-control" name="type" value={input.type} onChange={handleInputChange} >
                    <option value="Completed" > Completed </option>
                    <option value="Deleted"> Deleted </option>
                    <option value="Pending"> Pending </option>
                 </select>
             </div> &nbsp;
             <div className="my-3">
               <button className="btn btn-primary" onClick={handleTodoAdd}> Add </button>
             </div>
          </div>
          </Card>

            <Card className="mt-3"> 
               <Card.Header> 
                 <Card.Title > All Todos List </Card.Title>
               </Card.Header>
               <Card.Body> 
                    <ul className="list-group ">
                      { todo?.length > 0 ? todo.map((item, index) => {
                        return <li className="list-group-item d-flex justify-content-between mb-2" key={index} style={{backgroundColor: todosTypesCheck(item.type)}}>
                        <span style={{fontSize: "25px", }}> {item.title}  </span> <button className="btn btn-sm btn-danger" onClick={() => handleTodoDelete(item.id)}> X </button>
                      </li>
                      }) :  
                       (<li className="list-group-item">
                        <span > No Todos Found </span> 
                      </li>)}
                     
                    </ul>
               </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Todo;




















