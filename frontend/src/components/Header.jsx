import { Link } from 'react-router';

import LOGO_ICON from '../assets/icons/icon_black.png'
import CART_ICON from '../assets/icons/shopping-cart.png'
import SEARCH_ICON from '../assets/icons/search.png'
import DARK_ICON from '../assets/icons/dark-mode.png'
import LIGHT_ICON from '../assets/icons/light-mode.png'
import Cart from './Cart'
import { useState , useEffect, useContext } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const {selectedProducts, setSearchText} = useContext(CartContext)
    const [darkMode, setDarkMode] = useState(mediaQuery);
    const [displayCart, setDisplayCart] = useState(!true)

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            mediaQuery ? "dark" : "light"
        );
    }, [])

    const toggleTheme = () => {
        setDarkMode(prev => {
            const newValue = !prev;
    
            document.documentElement.setAttribute(
                "data-theme",
                newValue ? "dark" : "light"
            );
    
            return newValue;
        });
    };

    return (
        <header>
            <Link to='/'><img src={LOGO_ICON} alt="icon" height={50} className='logo_icon'/></Link>
            
            <div className="search_container">
                <input type="text" placeholder='Search...' onChange={(e) => setSearchText(e.target.value)} className='search_input'/>
                <button className='search_icon'><img src={SEARCH_ICON} alt="icon"/></button>
            </div>

            <img 
                src={darkMode ? DARK_ICON : LIGHT_ICON} alt="icon" height={50} 
                className={`${darkMode ? "togggle_theme" : ""} theme_icon`} 
                onClick={toggleTheme}
                title={`${darkMode ? "Dark Mode" : "Light Mode"}`} 
            />

            <div className="cartImgContainer" onClick={() => setDisplayCart(true)}>
                <img src={CART_ICON} alt="cart" height={50} className='cart_icon'/>
                <p>{selectedProducts.length}</p>
            </div>

            {displayCart && (<Cart setDisplayCart={setDisplayCart} selectedProducts={selectedProducts}/>)}
        </header>
    )
}

export default Header