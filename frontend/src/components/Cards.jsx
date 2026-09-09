import { Link } from 'react-router';
import { CartContext } from "./CartContext";
import { useState, useContext, useEffect} from 'react';
import product_details from '../../content.json'

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (currentId, setSelectedProducts, currentVariantId, setAddedConfirmed) => {
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

const buyNow = (currentId, currentVariantId) => {
    const currentProduct = product_details.find(p => p.id = currentId)
    const currentVariant = currentProduct.variants.find(v => v.id == currentVariantId)
    return(
        `Name - ${currentProduct.name} - ${currentVariant.name} \nPrice - ₦${currentVariant.price} per ${currentProduct.unit}`
    )
}

const Cards = ({product}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const [ selectedVariant, setSelectedVariant ] = useState(product.variants[0].id)
    const image = productImages[`../assets/product_pics/${product.images[0]}`]
    const [ addedConfirmed, setAddedConfirmed ] = useState(false)
    const PHONENUMBER = "2348100153987"

    return (
        <div className='individual_card' >
            <Link className='individual_card_link' to={`/product/${product.id-1}`} >
                <img src={image} alt="product images" height={100} className="product_img"/>
                <h2>{product.name}</h2>
                {
                    product.variants.length > 1 ?
                    <select onClick={(e)=> e.preventDefault()} name='selectedVariant' onChange={(e) => setSelectedVariant(Number(e.target.value))}>
                        {product.variants.map((p, index) => (
                            <option value={p.id} key={index}>
                                {p.name}: ₦{p.price} per {product.unit}
                            </option>
                        ))}
                    </select>
                    :
                    <>
                        {product.variants.map((p, index) => (
                            <span key={index}>
                                ₦{p.price} per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}
                            </span>
                        ))}
                    </>
                
                }
            </Link>

            <div className='cardActionBtnContainer'>
                <button disabled={addedConfirmed} className={`addBtn ${addedConfirmed && "addedConfirmBtn"}`}
                    onClick={() => addToCart(product.id, setSelectedProducts, selectedVariant, setAddedConfirmed)}
                >
                    {!addedConfirmed ? "Add to cart" : "Added ..."}
                </button>
                <a target="_blank" className='buyNowBtn'
                    href={`https://wa.me/${PHONENUMBER}?text=${encodeURIComponent(buyNow(product.id, selectedVariant))}`}
                >
                    Buy Now
                </a>
            </div>
        </div>
    )
}

export default Cards