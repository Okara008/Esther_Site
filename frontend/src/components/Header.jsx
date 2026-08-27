import LOGO_ICON from '../assets/icon_black.png'
import CART_ICON from '../assets/icons/shopping-cart.png'
import SEARCH_ICON from '../assets/icons/search.png'

const Header = () => {
    return (
        <header>
            <img src={LOGO_ICON} alt="icon" height={50} className='logo_icon'/>
            
            <div className="search_container">
                <input type="text" placeholder='Search...' className='search_input'/>
                <button className='search_icon'><img src={SEARCH_ICON} alt="icon"/></button>
            </div>

            <img src={CART_ICON} alt="cart" height={50} className='cart_icon'/>
        </header>
    )
}

export default Header