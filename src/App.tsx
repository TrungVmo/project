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
import AdminRouter from './routes/AdminRouter';
import FoodManage from './components/NavAdmin/FoodManage/FoodManage';
import UserManage from './components/NavAdmin/UserManage/UserMange';
import Category from './components/NavAdmin/Category/Category';
import Carts from './pages/Cart';
import Order from './components/NavAdmin/Order/Order';
import Profile from './pages/Profile/Profile';
import SignInAdmin from './components/SignInForm/SignInAdmin';
import SignRouter from './routes/SignRouter/SignRouter';
import SignAdRouter from './routes/SignRouter/SignAdRouter';
import FilterType from './pages/Filter/FilterType';
import SearchFilter from './pages/Search';


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

  const us = localStorage.getItem('user');
  const user = us ? JSON.parse(us ? us : "") : null;

  const ad = localStorage.getItem('admin');
  const admin = ad ? JSON.parse(ad ? ad : "") : null;

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Element Elem={Home} />}>
          </Route>
          <Route path='/menu' element={<Element Elem={Menu} />} />
          <Route path='/admin/food' element={
            <AdminRouter>
              <Admin Elem={FoodManage} />
            </AdminRouter>
          }>    
          </Route>
          <Route path='/admin/user' element={
            <AdminRouter>
              <Admin Elem={UserManage} />
            </AdminRouter>
          }>    
          </Route>
          <Route path='/admin/category' element={
            <AdminRouter>
              <Admin Elem={Category} />
            </AdminRouter>
          }>    
          </Route>
          <Route path='/admin/order' element={
            <AdminRouter>
              <Admin Elem={Order} />
            </AdminRouter>
          }>    
          </Route>
          <Route path='/cart' element={
            <PrivateRoute>
              <Element Elem={Carts} />
            </PrivateRoute>
          }>    
          </Route>
          <Route path='/profile' element={
            <PrivateRoute>
              <Element Elem={Profile} />
            </PrivateRoute>
          }>    
          </Route>

          <Route path= '/signin' element={
            <SignRouter>
              <SignIn />
            </SignRouter>
          }/>
          <Route path='/signup' element={<SignUp />} />
          <Route path= '/admin' element={
            <SignAdRouter>
              <SignInAdmin />
            </SignAdRouter>
          }/>
          <Route path='/detail/:id' element={<Element Elem={DetailFood} />} />
          <Route path='/menu/:type' element={<Element Elem={FilterType} />} />
          <Route path='/search' element={<Element Elem={SearchFilter} />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
