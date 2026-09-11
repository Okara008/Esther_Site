import Cards from "./Cards"
import products from "../../content.json"
import WHATSAPP_ICON from '../assets/icons/whatsapp_colored.png'
import {useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";

const filterProducts = (category, setDisplayedProducts, searchText) => {
    setDisplayedProducts([...products])
    if(searchText){
        setDisplayedProducts(prev => (prev.filter(p => p.name.includes(searchText) || p.category.includes(searchText) || p.variants.some(v => v.name.includes(searchText)))))
    }
    if(!category) return
    setDisplayedProducts(prev => prev.filter(product => product.category == category))
}

const Home = () => {
    const [productCategories] = useState(["hair accessories", "hair care", "hair brushes"])
    const [displayedProducts, setDisplayedProducts] = useState([...products])
    const [categoryIndex, setCategoryIndex] = useState(0)
    const {searchText, setSelectedProducts} = useContext(CartContext)

    useEffect(() => {
        filterProducts(productCategories[categoryIndex-1], setDisplayedProducts, searchText)
    }, [searchText])

    return(
        <main>
            <nav className="product_category">
                <div className={`${!categoryIndex && 'selected'}`} onClick={() => {filterProducts(null, setDisplayedProducts, searchText); setCategoryIndex(0)}}>All</div>
                
                {productCategories.map((category, index) => 
                    <div 
                        className={`${categoryIndex == (index+1) && 'selected'}`} 
                        onClick={() => {filterProducts(category, setDisplayedProducts, searchText); setCategoryIndex(index+1)}}
                        key={index}
                    >   
                        {category}  
                    </div>
                )}
            </nav>
            <a target="_blank" href="https://wa.me/2348100153987">
                <img src={WHATSAPP_ICON} alt="Whatsapp Chat" title="Chat on Whatsapp" className="whatsapp_icon"/>
            </a>   

            <section className="cardsSection">
                {displayedProducts.map(product => <Cards setSelectedProducts={setSelectedProducts} product={product} key={products.indexOf(product)}/> )}

                {!displayedProducts.length && (<span>No Product Available...</span>)}
            </section>
        </main>
    )
}

export default Home