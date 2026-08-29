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
    const [checkedVariant, setCheckedVariant] = useState(0)
    const [imageCounter, setImageCounter] = useState(0)
    let IMGS = []

    const [counter, setCounter] = useState(0)

    for (let i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        image = productImages[`../assets/product_pics/${image}`];
        IMGS.push(image)
    }

    return (
    <article className="productContainer">
        <div  className="product_img">
            <img src={IMGS[imageCounter]} alt="Product Image"/>
            <div className="img_nav">
                <button style={{left: 0}} onClick={() => setImageCounter(prev => ((prev + 1) % IMGS.length))}>&lt;</button>
                <button style={{right: 0}} onClick={() => setImageCounter(prev => ((prev - 1) > 0 ? (prev - 1) : (IMGS.length-1) ))}>&gt;</button>
            </div>
        </div>
        <div>
            <h3 className="article_name">{product.name}</h3>
            <p className="article_category">-{product.category}-</p>


            {product.colors?.length &&
                <div className="article_color">
                    {product.colors.map(color => (
                        <div>
                            <input type="checkbox" id={product.colors.indexOf(color)}/>
                            <label htmlFor={product.colors.indexOf(color)}>{color}</label>
                        </div>
                    ))}
                </div>
            }

            {product.variants.length ?
                <>
                    <div className="variant_details">
                    {product.variants.map(variant => (
                        <>  
                            <input type="radio" name="product" id={product.variants.indexOf(variant)} checked={checkedVariant == (product.variants.indexOf(variant))} onClick={() => setCheckedVariant(product.variants.indexOf(variant))}/>
                            <label htmlFor={product.variants.indexOf(variant)} >
                                <h4 className="variant_name">{variant.name}</h4>
                                <p className="variant_price">₦<b>{variant.price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                                {Boolean(variant.others.length)  && 
                                    variant.others.map(prop => (<div> <strong>{prop.name}</strong>: <span>{prop.value}</span></div>))
                                }
                            </label>
                        </>
                    ))}
                    </div>
                    <p> Total: <strong>₦{product.variants[checkedVariant]?.price * counter}</strong></p>
                </>
                
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