import { Route, Routes } from 'react-router-dom';
import Task from './components/Task';
import Navbar from './layouts/Navbar';
import AddTask from './components/AddTask';
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Task />}/>
      <Route path='/addTodo' element={<AddTask />}/>
    </Routes>
    </>
  )
}

export default App