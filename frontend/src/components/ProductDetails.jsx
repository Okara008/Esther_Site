import { useParams } from "react-router";
import { useState, useRef } from 'react';
import products from "../../content.json"

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const ProductDetails = () => {
    const { id } = useParams()
    const [product] = useState(products[id])
    const [imageCounter, setImageCounter] = useState(0)
    let IMGS = []

    const [counter, setCounter] = useState(0)

    for (let i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        image = productImages[`../assets/product_pics/${image}`];
        console.log(IMGS);
        IMGS.push(image)
    }

    console.log(products[id]);
    return (
    <article className="productContainer">
        <img src={IMGS[imageCounter]} alt="Product Image" className="product_img"/>
        <div>
            <h3 className="article_name">{product.name}</h3>
            <p className="article_category">{product.category}</p>

            {
                product.variants.length ?
                
                <p>sddd</p>
                
                :
                
                <>
                    <p className="article_price">₦<b>{product.price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                    {Boolean(product.others.length)  && 
                        product.others.map(prop => (<> <span>{prop.name}</span>: <span>{prop.value}</span></>))
                    }
                    <p> Total: <strong>₦{product.price * counter}</strong></p>
                </>
            }

            <div className="article_counter">
                <button onClick={() => setCounter(prev => {
                    let copy = prev
                    if (copy < 1) return copy
                    return copy - 1
                })}>-</button>
                <input type="text" value={counter}  onChange={(e) => setCounter(prev => (isNaN(Number(e.target.value)) ? prev : Number(e.target.value)))} inputMode="numeric"/>
                <button onClick={() => setCounter(prev => prev + 1)}>+</button>
            </div>

            <button className="article_button"> Add to cart</button>
        </div>
    </article>
    )
}
export default ProductDetails