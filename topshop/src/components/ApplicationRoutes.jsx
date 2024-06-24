import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './Context/UserContext'
import Home from './Home/Home'
import ProductListing from './ProductListing/ProductListing'
import ProductDetails from './ProductDetails/ProductDetails'
import Header from './Header/Header'
import Catalog from './Catalog/Catalog'
import Login from './Login/Login'
import Register from './Register/Register'
import Checkout from './Checkout/Checkout'
import Success from './Success/Success'
import Cart from './Cart/Cart'
import Dashboard from './Dashboard/Dashboard'
import Profile from './Profile/Profile'
import ProductManage from './ManageProducts/ProductManage'
import CustomDataGrid from './ManageProducts/test'

export default function ApplicationRoutes() {
  return (
    <Routes>

        <Route 
        element={<Home/>} 
        path="/"
        />


        <Route
        element={ <ProductListing/>}
        path='/listitem'
        />


        <Route 
        element={<ProductDetails/>}
        path='/product/:id'
        
        />


        <Route
        element={<Header/>}
        path='/header'
        
        />


        <Route
        element={<Catalog/>}
        path='/browse'
        />


        <Route
        element={<ProductManage/>}
        path='/manage'
        />


        <Route 
        element={<Login/>} 
        path="/login"
        />


        <Route 
        element={<Register/>} 
        path="/register"
        />


        <Route
        element={<Checkout/>}
        path='/checkout'
        />


        <Route
        element={<Profile/>}
        path='/profile'
        />


        <Route
        element={<Cart/>}
        path='/cart'
        />


        <Route
        element={<Dashboard/>}
        path='/dashboard'
        />



        <Route
        element={<Success/>}
        path='/success'
        />

        <Route
        element={<CustomDataGrid/>}
        path='/test'
        />
    </Routes>
  )
}
