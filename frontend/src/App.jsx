import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'
import './styles/Header.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/Cards.css'
import './styles/Cart.css'
import './styles/ProductDetails.css'
import Header from './components/Header'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Footer from './components/Footer'
import CartItemProvider from './components/CartContext'
import NotFound from './components/NotFound';
function App() {
    return (
    <CartItemProvider>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/product/:id' element={<ProductDetails />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </CartItemProvider>
    )
}

export default App
