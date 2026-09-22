import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './styles/Header.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/Cards.css'
import './styles/Cart.css'
import './styles/Product.css'
import Header from './components/Header'
import Home from './components/Home'
import Product from './components/Product'
import Footer from './components/Footer'
import CartItemProvider from './components/CartContext'
import NotFound from './components/NotFound';
function App() {
    const ScrollToTop = () => {
        const { pathname } = useLocation();
    
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
    
        return null;
    };

    return (
    <CartItemProvider>
        <BrowserRouter>
        <ScrollToTop />
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/product/:id' element={<Product />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </CartItemProvider>
    )
}

export default App
