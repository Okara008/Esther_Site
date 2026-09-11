import { useParams } from "react-router";
import { useState, useRef, useContext, Fragment } from 'react';
import products from "../../content.json"
import { CartContext } from "./CartContext";

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (currentId, setSelectedProducts, amount, currentVariantId, selectedColors, setAddedConfirmed) => {
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

        const formattedColors = Object.entries(selectedColors)
        .filter(([_, value]) => value.checked)
        .map(([colorName, value]) => `${colorName} (x${value.count})`);

        if (foundIndex !== -1) {
            copy[foundIndex] = {
                ...copy[foundIndex],
                variant: {
                    ...copy[foundIndex].variant,
                    amount: amount
                },
                colors: formattedColors
            }
            return copy
        }
        else{
            copy.push({
                id: currentId,
                variant: {
                    id: currentVariantId,
                    amount: amount
                },
                colors: formattedColors
            })
            return copy
        }
        
    })
    setAddedConfirmed(true)
    setTimeout(() => setAddedConfirmed(false), 1000)
}

const buyNow = (currentId, amount, currentVariantId, selectedColors) => {
    const currentProduct = products.find(p => p.id == currentId)
    const currentVariant = currentProduct.variants.find(v => v.id == currentVariantId)
    const formattedColors = Object.entries(selectedColors)
    .filter(([_, value]) => value.checked)
    .map(([colorName, value]) => `${colorName} (x${value.count})`);

    const display = `Name - ${currentProduct.name} - ${currentVariant.name} \nAmount - ${amount} ${currentProduct.unit}(s) \nPrice - ₦${currentVariant.price} per ${currentProduct.unit} \nColors - ${formattedColors.length > 0 ? formattedColors : "none"} \n\n\nTotal - ${currentVariant.price * amount}`
    return display
}

const ProductDetails = () => {
    const PHONENUMBER = "2348100153987"

    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    let { id } = useParams()
    id = Number(id)
    const [product] = useState(products[id])
    const [checkedVariant, setCheckedVariant] = useState(product.variants[0].id)
    const [imageCounter, setImageCounter] = useState(0)
    const [ addedConfirmed, setAddedConfirmed ] = useState(false)
    const [selectedColors, setSelectedColors] = useState({});
    const [counter, setCounter] = useState(1)
    let IMGS = []

    const selectedColorTotal = Object.values(selectedColors)
    .filter(color => color.checked)
    .reduce((total, color) => total + color.count, 0);

    const hasSelectedColors = selectedColorTotal > 0;
    
    const handleColorCheck = (colorName) => {
        setSelectedColors(prev => {
            const isChecked = !prev[colorName]?.checked;
            return {
                ...prev,
                [colorName]: {
                    checked: isChecked,
                    count: prev[colorName]?.count || 1
                }
            };
        });
    };

    const handleColorCounter = (colorName, delta) => {
        setSelectedColors(prev => ({
            ...prev,
            [colorName]: {
                ...prev[colorName],
                count: Math.max(1, (prev[colorName]?.count || 1) + delta)
            }
        }));
    };

    const handleProductCounter = (delta) => {
        setCounter(prev => Math.max(1, (prev || 1) + delta))
    }

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


            {Boolean(product.colors?.length) &&
                <>
                    <div className="article_color">
                        {product.colors.map((color, index) => (
                            <div key={index}>
                                <input 
                                    type="checkbox" 
                                    id={`color-${index}`} 
                                    name={color}
                                    checked={Boolean(selectedColors[color]?.checked)}
                                    onChange={() => handleColorCheck(color)}
                                />
                                <label htmlFor={`color-${index}`}>{color}</label>
                            </div>
                        ))}
                    </div>

                    <div className="selected_colors_summary">
                        {Object.entries(selectedColors)
                            .filter(([_, value]) => value.checked)
                            .map(([colorName, value]) => (
                                <div key={colorName} className="selected_color_item" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                                    <span>{colorName}</span>

                                    <div className="article_counter">
                                        <button onClick={() => handleColorCounter(colorName, -1)}>-</button>
                                        <input type="text" value={value.count} inputMode="numeric"
                                            onChange={(e) => setSelectedColors(prev => ({
                                                ...prev,
                                                [colorName]: {
                                                    ...prev[colorName],
                                                    count: Number(e.target.value)
                                                }
                                            }))} 
                                            onBlur={(e) => setSelectedColors(prev => ({
                                                ...prev,
                                                [colorName]: {
                                                    ...prev[colorName],
                                                    count: isNaN(e.target.value) ? 0 : Number(e.target.value)
                                                }
                                            }))} 
                                        />

                                        <button onClick={() => handleColorCounter(colorName, 1)}>+</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }


            {product.variants?.length > 1 ?
                <>
                    <div className="variant_details">
                        {product.variants.map((variant, index) => (
                            <Fragment key={variant.id}>  
                                <input type="radio" checked={variant.id == checkedVariant} name="variant" id={index} onChange={() => setCheckedVariant(variant.id)}/>
                                <label htmlFor={index} >
                                    <h4 className="variant_name">{variant.name}</h4>
                                    <p className="variant_price">₦<b>{variant.price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                                    {Boolean(variant.attributes.length)  && 
                                        variant.attributes.map((prop, index) => (<div key={index}> <strong>{prop.name}</strong>: <span>{prop.value}</span></div>))
                                    }
                                </label>
                            </Fragment>
                        ))}
                    </div>
                    <p> Total: 
                        <strong>₦{product.variants.find(v => v.id == checkedVariant)?.price * (hasSelectedColors ? selectedColorTotal: counter)}</strong>
                    </p>
                </>
                
                :
                
                <>
                    <p className="article_price">₦<b>{product.variants[0].price}</b> per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</p>
                    {Boolean(product.attributes?.length)  && 
                        product.attributes.map(prop => (<> <span>{prop.name}</span>: <span>{prop.value}</span></>))
                    }
                    <p> Total: 
                        <strong>₦{product.variants[0]?.price * (hasSelectedColors ? selectedColorTotal: counter)}</strong>
                    </p>
                </>
            }

            <div className="article_counter">
                <button disabled={hasSelectedColors} className={hasSelectedColors ? "disableBtn" : ""} onClick={() => handleProductCounter(-1)}>-</button>

                <input type="text" inputMode="numeric"
                    value={hasSelectedColors ? selectedColorTotal : counter} 
                    readOnly={hasSelectedColors}
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

                <button disabled={hasSelectedColors}  className={hasSelectedColors ? "disableBtn" : ""} onClick={() => handleProductCounter(1)}>+</button>
            </div>

            <div className='articleActionBtns'>
                <a target="_blank" className='buyNowBtn'
                    href={`https://wa.me/${PHONENUMBER}?text=${encodeURIComponent(buyNow(product.id, (hasSelectedColors ? selectedColorTotal : counter), checkedVariant, selectedColors))}`}
                >
                    Buy Now
                </a>

                <button disabled={addedConfirmed} className={`addBtn ${addedConfirmed && "article_button"}`}
                    onClick={(e) => addToCart(product.id, setSelectedProducts, (hasSelectedColors ? selectedColorTotal : counter), checkedVariant, selectedColors, setAddedConfirmed)}
                >
                    {!addedConfirmed ? "Add to cart" : "Added ..."}
                </button>
            </div>
        </div>
    </article>
    )
}
export default ProductDetails