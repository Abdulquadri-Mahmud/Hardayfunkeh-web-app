import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home_page';
import SearchPage from '../pages/SearchPage';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/dashboard_pages/Dashboard';
import Layout from '../layout/Layout';
import AdminLogin from '../pages/auth/admin/Login';
import UserLogin from '../pages/auth/user/Login';
import Customer_page from '../pages/dashboard_pages/Customers';
import Order_page from '../pages/dashboard_pages/Order';
import ItemsPage from '../pages/dashboard_pages/ItemsPage';
import CreateItem from '../pages/dashboard_pages/NewItem';
import UpdateItem from '../pages/dashboard_pages/UpdateItems';
import Signup from '../pages/auth/user/Signup';
import About from '../pages/About';
import User_Private_Route from '../components/private/User.private.routes';
import Profile from '../pages/Profile';
import Contact from '../pages/Contact';
import Shop from '../pages/Shop';
import CartPage from '../pages/CartPage';
import Details from '../pages/Product_details';
import ForgotPassword from '../pages/auth/user/ForgotPassword';
import ResetPassword from '../pages/auth/user/ResetPassword';
import CheckOutPage from '../pages/Checkout_page';
import Wishlists from '../pages/WishlistsPag';
import JewelleryPage from '../pages/Shop_pages/JewelleryPage';
import JalabPage from '../pages/Shop_pages/JalabPage';
import FabricPage from '../pages/Shop_pages/FabricPage';
import AbayaPage from '../pages/Shop_pages/AbayaPage';
import Admin_Private_Route from '../components/private/Admin.private.routes';

export default function AppRoutes() {
  return (
    <Router>
        {/* <Header/> */}

        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='*' element={<NotFound/>}/>
          
          <Route path='/login' element={<UserLogin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot_password' element={<ForgotPassword/>}/>
          <Route path='/reset_password/:token' element={<ResetPassword/>}/>

          <Route path='/admin-login' element={<AdminLogin/>}/>

          <Route path='/about' element={<About/>}/>

          <Route path='/shop' element={<Shop/>}/>
          <Route path='/abaya' element={<AbayaPage/>}/>
          <Route path='/jewellery' element={<JewelleryPage/>}/>
          <Route path='/jalab' element={<JalabPage/>}/>
          <Route path='/fabrics' element={<FabricPage/>}/>


          <Route path='/contact' element={<Contact/>}/>
          <Route path='/wishlist' element={<Wishlists/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/product-details/:id' element={<Details/>}/>

          <Route path='/contact' element={<Contact/>}/>

          <Route element={<User_Private_Route/>}>
            <Route path='/checkout' element={<CheckOutPage/>}/>
            <Route path='/profile/:userId' element={<Profile/>}/>
          </Route>
          <Route element={<Admin_Private_Route/>}>
            <Route path='/dashboard' element={<Layout/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='new-item' element={<CreateItem/>}/>
              <Route path='items' element={<ItemsPage/>}/>
              <Route path='order' element={<Order_page/>}/>
              <Route path='customers' element={<Customer_page/>}/>
              <Route path='items/update-item/:id' element={<UpdateItem/>}/>
            </Route>
          </Route>
        </Routes>
    </Router>
  )
}
