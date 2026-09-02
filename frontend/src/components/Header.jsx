import { Link } from 'react-router';

import LOGO_ICON from '../assets/icon_black.png'
import CART_ICON from '../assets/icons/shopping-cart.png'
import SEARCH_ICON from '../assets/icons/search.png'
import THEME_ICON from '../assets/dark_theme.png'
import Cart from './Cart'
import { useState , useEffect } from "react";

const Header = ({selectedProducts}) => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [darkMode, setDarkMode] = useState(mediaQuery);
    const [displayCart, setDisplayCart] = useState(true)

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
                <input type="text" placeholder='Search...' className='search_input'/>
                <button className='search_icon'><img src={SEARCH_ICON} alt="icon"/></button>
            </div>

            <img 
                src={THEME_ICON} alt="icon" height={50} 
                className={`${darkMode ? "togggle_theme" : ""} theme_icon`} 
                onClick={toggleTheme}
                title={`${darkMode ? "Dark Mode" : "Light Mode"}`} 
            />

            <img src={CART_ICON} alt="cart" height={50} className='cart_icon' onClick={() => setDisplayCart(true)}/>

            {displayCart && (<Cart setDisplayCart={setDisplayCart} selectedProducts={selectedProducts}/>)}
        </header>
    )
}

export default Header