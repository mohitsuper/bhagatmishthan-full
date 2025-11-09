import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Topbar from '../Topbar/Topbar'
import Singin from '../User/Singin'
import Best_Seller_product from '../Best-Seller-product/Best_Seller_product'
import Management_products from '../management_products/Management_products'
import Banner from '../banner/Banner'
import Category from '../category/Category'
import ProductType from '../product-type/ProductType'
export default function AllRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/topbar" element={<Topbar/>}/>
      <Route path="/users" element={<Singin/>}/>
      <Route path="/best-seller-product" element={<Best_Seller_product/>}/>
      <Route path="/product-type" element={<ProductType/>}/>
      <Route path="/management-products" element={<Management_products/>}/>
      <Route path="/orders" element={<h1 className='text-3xl font-bold text-center mt-20'>Orders Page</h1>}/>
      <Route path="/settings" element={<h1 className='text-3xl font-bold text-center mt-20'>Settings Page</h1>}/>
      <Route path="/profile" element={<h1 className='text-3xl font-bold text-center mt-20'>Profile Page</h1>}/>
      <Route path="/billing" element={<h1 className='text-3xl font-bold text-center mt-20'>Billing Page</h1>}/>
      <Route path="/customize" element={<h1 className='text-3xl font-bold text-center mt-20'>Customize Page</h1>}/>
      <Route path="/notifications" element={<h1 className='text-3xl font-bold text-center mt-20'>Notifications Page</h1>}/>
      <Route path="/integrations" element={<h1 className='text-3xl font-bold text-center mt-20'>Integrations Page</h1>}/>
      <Route path="/banner" element={<Banner/>}/>
      <Route path="/category" element={<Category/>}/>
      <Route path="*" element={<h1 className='text-3xl font-bold text-center mt-20'>404 Page Not Found</h1>}/>
    </Routes>
  )
}
