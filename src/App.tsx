import React from 'react';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Menu from './pages/Menu/Menu';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
        <Routes>
      
          <Route path='/' element={<Home />}>
          </Route>
          <Route path='/menu' element={<Menu />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
