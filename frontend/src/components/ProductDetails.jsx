import { useParams } from "react-router";
import { useState, useRef, useContext, useEffect } from 'react';
import products from "../../content.json"
import { CartContext } from "./CartContext";

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (e, id, setSelectedProducts, amount, variant_id, colors) => {
    e.preventDefault()
    setSelectedProducts(prev => {
        const copy = [...prev]
        let index = copy.findIndex(product => product.id == id)

        if (index !== -1) {
            copy[index] = {...copy[index], amount: (copy[index].amount+1)}
            return copy
        }
        else{
            console.log(2);
            copy.push({
                id: id,
                amount: amount,
                variant_id: variant_id.current.filter(e => e.checked).map(e => e.id),
                color: colors.current.filter(e => e.checked).map(e => e.name)
            })
            return copy
        }
    })
}

const ProductDetails = () => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    let { id } = useParams()
    id = Number(id)
    const [product] = useState(products[id])
    const [checkedVariant, setCheckedVariant] = useState(0)
    const [imageCounter, setImageCounter] = useState(0)
    const colorRefs = useRef([])
    const variantRefs = useRef([])
    let IMGS = []
    
    const [counter, setCounter] = useState(1)

    for (let i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        image = productImages[`../assets/product_pics/${image}`];
        IMGS.push(image)
    }

    return (
    <article className="productContainer">
        <div  className="product_img">
            <img src={IMGS[imageCounter]} alt="Product Image"/>

            {IMGS.length > 1 && (
                <div className="img_nav">
                    <button style={{left: 0}} onClick={() => setImageCounter(prev => ((prev + 1) % IMGS.length))}>&lt;</button>
                    <button style={{right: 0}} onClick={() => setImageCounter(prev => ((prev - 1) > 0 ? (prev - 1) : (IMGS.length-1) ))}>&gt;</button>
                </div>
            )}
        </div>

        <div>
            <h3 className="article_name">{product.name}</h3>
            <p className="article_category">-{product.category}-</p>

            {product.colors?.length &&
                <div className="article_color">
                    {product.colors.map((color, index) => (
                        <div key={index}>
                            <input type="checkbox" id={product.colors.indexOf(color)} name={color}
                                ref={el => colorRefs.current[index] = el}
                            />
                            <label htmlFor={product.colors.indexOf(color)}>{color}</label>
                        </div>
                    ))}
                </div>
            }

            {product.variants.length ?
                <>
                    <div className="variant_details">
                    {product.variants.map((variant, index) => (
                        <>  
                            <input type="checkbox" name={variant.name} variantRefs={el => variantRefs.current[index] = el} id={product.variants.indexOf(variant)} onClick={() => setCheckedVariant(product.variants.indexOf(variant))}/>
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
                    if (copy <= 1) return copy
                    return copy - 1
                })}>-</button>

                <input type="text" value={counter} inputMode="numeric"
                    onChange={(e) => 
                        setCounter(prev => {
                            const num = Number(e.target.value)
                            if(isNaN(num)){
                                return prev
                            }
                            return num
                        })
                    } 
                    onBlur={(e) => setCounter(prev => {
                            const num = Number(e.target.value)
                            if(num < 1){
                                return 1
                            }
                            return num
                        })
                    }
                />

                <button onClick={() => setCounter(prev => prev + 1)}>+</button>
            </div>

            <button className="article_button" onClick={(e) => addToCart(e, (id+1), setSelectedProducts, counter, variantRefs, colorRefs)}>
                Add to Cart
            </button>


        </div>
    </article>
    )
}
export default ProductDetails