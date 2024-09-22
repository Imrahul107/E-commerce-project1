import React from "react";
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPages from "./pages/nopage/NoPages";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import ProductInfo from "./pages/productinfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct/></ProtectedRouteForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct/></ProtectedRouteForAdmin>} />

          <Route path="/*" element={<NoPages />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  );
}

export default App;


// user

export const ProtectedRoute=({children})=>{
  const user=localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 
// export const ProtectedRouteForAdmin=({children})=>{
//   const admin=JSON.parse(localStorage.getItem('user'));
//   console.log(admin.user.email);
//   if(admin.user.email==='admin123@gmail.com'){
//     return children;
//   }else{
//     return <Navigate to='/login'/>
//   }
// };

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  console.log(admin.user.email);
  if (admin.user.email === 'admin123@gmail.com') {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

ProtectedRouteForAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};


