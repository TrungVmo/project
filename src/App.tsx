import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Menu from './pages/Menu';
import PrivateRoute from './routes/PrivateRouter';
import DetailFood from './pages/DetailFood';
import Footer from './components/Footer/Footer';


const Element: React.FC<{Elem: any}>= ({Elem}) => {
  return(
    <div className='App'>
      <Header />
      <Elem/>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Element Elem={Home} />}>
          </Route>
          <Route path='/menu' element={<Element Elem={Menu} />} />
          {/* <Route path='/menu' element={
            <PrivateRoute>
              <Element Elem={Menu} />
            </PrivateRoute>
          }>    
          </Route> */}
          <Route path='/admin' element={<Admin />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/detail/:id' element={<DetailFood />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
