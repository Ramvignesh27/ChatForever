import { Route, Routes } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import { Button } from '@chakra-ui/react'
import Chatpage from './pages/Chatpage'
Button

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path="/chats" element={<Chatpage></Chatpage>}></Route>
        
      </Routes>
    </div>
  )
}

export default App
