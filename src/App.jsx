import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(t => t.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS(0)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS(0)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    saveToLS(0)
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos);
    saveToLS(0)
  }

  return (
    <>
      <Navbar />
      <div className=" container mx-auto my-5 rounded-xl p-5 bg-gray-300 text-black min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>WorkPlace- Manage your tasks here.</h1>
        <div className='addTodo my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-xl'> Add Your Today's Tasks! </h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} className="w-full rounded-full px-5 py-2" type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-gray-400 hover:bg-gray-600 disabled:bg-gray-400 rounded-full p-4 py-2 text-lg font-semibold items-center mx-2'>Save</button>
          </div>
        </div>
        <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor='show'>Show Finished Tasks</label>
        <div className="h-[1px] bg-black opacity-20 w-[90%] mx-auto my-4"></div>
        <h2 className='font-bold text-xl'>Tasks To Be Done!</h2>
        <div className="todos">
          {(todo.length == 0 && <div className='text-red-500 m-5'><b>ARE YOU LAZYY TODAY!!?</b></div>)}
          
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-4">
              <div className='flex gap-4'>
                <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-gray-400 hover:bg-gray-600 rounded-lg p-3 py-1 mx-2 font-semibold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-gray-400 hover:bg-gray-600 rounded-lg p-3 py-1 mx-2 font-semibold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>

  )
}

export default App
