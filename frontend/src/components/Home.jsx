import Cards from "./Cards"
import products from "../../content.json"
import WHATSAPP_ICON from '../assets/icons/whatsapp_colored.png'
import { Link } from 'react-router';
import {useState} from 'react';

const filterProducts = (category, setDisplayedProducts) => {
    setDisplayedProducts(products.filter(product => product.category == category))
}

const Home = () => {
    const [productCategories] = useState(["hair accessories", "hair care", "hair brushes"])
    const [displayedProducts, setDisplayedProducts] = useState([...products])
    const [categoryIndex, setCategoryIndex] = useState(0)

    return(
        <main>
            <nav className="product_category">
                <div className={`${!categoryIndex && 'selected'}`} onClick={() => {setDisplayedProducts([...products]); setCategoryIndex(0)}}>All</div>
                
                {productCategories.map(category => 
                    <div 
                        className={`${categoryIndex == (productCategories.indexOf(category)+1) && 'selected'}`} 
                        onClick={() => {filterProducts(category, setDisplayedProducts); setCategoryIndex(productCategories.indexOf(category)+1)}}
                    >   
                        {category}  
                    </div>
                )}
            </nav>

            <a target="_blank" href="https://wa.me/2348100153987">
                <img src={WHATSAPP_ICON} alt="Whatsapp Chat" title="Chat on Whatsapp" className="whatsapp_icon"/>
            </a>   

            <section className="cardsSection">
                {displayedProducts.map(product => <Cards product={product} key={products.indexOf(product)}/> )}

                {!displayedProducts.length && (<span>No Product Available...</span>)}
            </section>
        </main>
    )
}

export default Home