import Cards from "./Cards"
import products from "../../content.json"
import WHATSAPP_ICON from '../assets/icons/whatsapp_colored.png'
import {useState} from 'react';

const Home = () => {
    const [productCategories] = useState(["hair accessories", "hair care", "hair brushes"])
    console.log(products[0]);
    return(
        <main>
            <nav className="product_category">
                <div className="selected">All</div>
                {productCategories.map(productCategory => <div>{productCategory}</div>)}
            </nav>

            <img src={WHATSAPP_ICON} alt="Whatsapp Chat" title="Chat on Whatsapp" className="whatsapp_icon"/>

            <section>
                {products.map(product => <Cards product={product} key={products.indexOf(product)}/> )}
            </section>
        </main>
    )
}

export default Home