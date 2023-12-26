import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { todosTypesCheck } from "../../helpers/helpers";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";


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
      if (!input.title || !input.type) {
        toast("All Fields Are Required!")
      }else{
        await axios.post("http://localhost:5000/todos", input)
        getAllTodos();
        toast("Todo Created Successfull")
      }

    }

    // delete todo 
    const handleTodoDelete = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

         axios.delete(`http://localhost:5000/todos/${id}`)

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
        getAllTodos();
      });

       
     
    }

    useEffect(() => {
      getAllTodos();
    }, [])

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={5}> 
          <h2 className="text-center mt-5 text-primary " style={{fontSize: "28px"}}> Add Your Todo </h2>
          <Card > 
          <div className="todo-app d-flex p-3">          
             <div className="my-3">
                <input type="text" className="form-control" placeholder="Insert a todo" name="title" value={input.title} onChange={handleInputChange}/>
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
                        <span style={{fontSize: "25px", }}> {item.title}  </span> <button className="btn btn-sm btn-danger" onClick={() => handleTodoDelete(item.id)}> <FaTrashAlt /> </button>
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




















