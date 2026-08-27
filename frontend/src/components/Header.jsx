import LOGO_ICON from '../assets/icon_black.png'
import CART_ICON from '../assets/icons/shopping-cart.png'
import SEARCH_ICON from '../assets/icons/search.png'
import THEME_ICON from '../assets/dark_theme.png'
import { useState } from "react";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

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
            <img src={LOGO_ICON} alt="icon" height={50} className='logo_icon'/>
            
            <div className="search_container">
                <input type="text" placeholder='Search...' className='search_input'/>
                <button className='search_icon'><img src={SEARCH_ICON} alt="icon"/></button>
            </div>

            <img 
                src={THEME_ICON} alt="icon" height={50} 
                className={`${darkMode ? "togggle_theme" : ""} theme_icon`} 
                onClick={toggleTheme}
                title={`${darkMode ? "Dark Theme" : "Light Theme"}`} 
            />
            <img src={CART_ICON} alt="cart" height={50} className='cart_icon'/>
        </header>
    )
}

export default Header