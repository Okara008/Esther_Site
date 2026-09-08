import { Link } from 'react-router';
import { CartContext } from "./CartContext";
import { useState, useContext, useEffect} from 'react';

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (e, currentId, setSelectedProducts, currentVariantId, setAddedConfirmed) => {
    e.preventDefault()
    
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
                    amount: (copy[foundIndex].variant.amount + 1)
                }
            }
            return copy
        }
        
        else{
            copy.push({
                id: currentId,
                variant: {
                    id: currentVariantId,
                    amount: 1
                },
                colors: []
            })
            return copy
        }
    })
    setAddedConfirmed(true)
    setTimeout(() => setAddedConfirmed(false), 1000)
}
    
const Cards = ({product}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const [ selectedVariant, setSelectedVariant ] = useState(0)
    const image = productImages[`../assets/product_pics/${product.images[0]}`]
    const [ addedConfirmed, setAddedConfirmed ] = useState(false)

    return (
        <Link className='individual_card' to={`/product/${product.id-1}`} >
            <img src={image} alt="product images" height={100} className="product_img"/>
            <h2>{product.name}</h2>

            {
                product.variants.length ? 
                <select onClick={(e)=> e.preventDefault()} name='selectedVariant' onChange={(e) => setSelectedVariant(e.target.value)}>
                    {product.variants.map((p, index) => (
                        <option value={index} key={index}>
                            {p.name}: ₦{p.price} per {product.unit}
                        </option>
                    ))}
                </select>
                :
                <span>₦{product.price} per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</span>
                
            }

            {!addedConfirmed && (
                <button 
                    onClick={(e) => addToCart(e, product.id, setSelectedProducts, selectedVariant, setAddedConfirmed)}
                >
                    Add to cart
                </button>
            )}

            {addedConfirmed && (
                <button disabled={true} style={{backgroundColor: "green"}}>
                    Added ...
                </button>
            )}
        </Link>
    )
}

export default Cards