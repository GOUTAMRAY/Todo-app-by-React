

import { ToastContainer } from 'react-toastify'
import './App.css'
import Todo from './components/Todos/Todo'

function App() {
 

  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
     <Todo />
    </>
  )
}

export default App
