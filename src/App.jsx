import './App.css';
import Login from './components/Login';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import Registro from './components/Registro';
import Restablecer from './components/Restablecer';
import RegistroAdmin from './components/RegistroAdmin';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null);
  const [iduser, setiduser] = useState("");
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login callback={setUser} setiduser={setiduser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user} iduser={iduser}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/retablecer' element={<Restablecer/>}></Route>
        <Route path='/registroAdmin' element={<RegistroAdmin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
