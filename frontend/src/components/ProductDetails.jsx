import { useParams } from "react-router";
import { useState, useRef, useContext, Fragment } from 'react';
import products from "../../content.json"
import { CartContext } from "./CartContext";

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (e, currentId, setSelectedProducts, amount, currentVariantId, colors, setAddedConfirmed) => {
    e.preventDefault()
    console.log(amount);
    setSelectedProducts(prev => {
        const copy = [...prev]
        let foundIndex = -1
        let copy_indexes = copy
            .map((product, index) => product.id == currentId ? index : -1)
            .filter(index => index !== -1)

        for (let i = 0; i < copy_indexes.length; i++) {
            const index = copy_indexes[i];

            if ( copy[index]?.variant.id == currentVariantId ) {
                foundIndex = index
                break
            }            
        }
    
        if (foundIndex !== -1) {
            copy[foundIndex] = {
                ...copy[foundIndex],
                variant: {
                    ...copy[foundIndex].variant,
                    amount: amount
                },
                colors: colors.current.filter(e => e.checked).map(e => e.name)
            }
            setAddedConfirmed(true)
            setTimeout(() => setAddedConfirmed(false), 1000)
            return copy
        }
        else{
            copy.push({
                id: currentId,
                variant: {
                    id: currentVariantId,
                    amount: amount
                },
                colors: colors.current.filter(e => e.checked).map(e => e.name)
            })
            setAddedConfirmed(true)
            setTimeout(() => setAddedConfirmed(false), 1000)
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
    const [ addedConfirmed, setAddedConfirmed ] = useState(false)
    const colorRefs = useRef([])
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
                    <button style={{right: 0}} onClick={() => setImageCounter(prev => ((prev > 0) ? (prev - 1) : (IMGS.length-1) ))}>&gt;</button>
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

            {product.variants?.length ?
                <>
                    <div className="variant_details">
                    {product.variants.map((variant, index) => (
                        <Fragment key={variant.id}>  
                            <input type="radio" checked={index == checkedVariant} name="variant" id={index} onClick={() => setCheckedVariant(index)}/>
                            <label htmlFor={index} >
                                <h4 className="variant_name">{variant.name}</h4>
                                <p className="variant_price">₦<b>{variant.price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                                {Boolean(variant.others.length)  && 
                                    variant.others.map((prop, index) => (<div key={index}> <strong>{prop.name}</strong>: <span>{prop.value}</span></div>))
                                }
                            </label>
                        </Fragment>
                    ))}
                    </div>
                    <p> Total: <strong>₦{product.variants[checkedVariant]?.price * counter}</strong></p>
                </>
                
                :
                
                <>
                    <p className="article_price">₦<b>{product.price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                    {Boolean(product.others?.length)  && 
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

            {!addedConfirmed && (
                <button className="article_button" onClick={(e) => addToCart(e, (id+1), setSelectedProducts, counter, checkedVariant, colorRefs, setAddedConfirmed)}>
                    Add to Cart
                </button>
            )}

            {addedConfirmed && (
                <button disabled={true} className="article_button_disabled">
                    Added ...
                </button>
            )}
        </div>
    </article>
    )
}
export default ProductDetails