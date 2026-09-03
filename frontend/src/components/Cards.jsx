import { Link } from 'react-router';
import { CartContext } from "./CartContext";
import { useState, useContext, useEffect} from 'react';

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const addToCart = (e, id, setSelectedProducts) => {
    e.preventDefault()
    setSelectedProducts(prev => {
        const copy = [...prev]
        let index = copy.findIndex(product => product.id == id)

        if (index !== -1) {
            copy[index] = {...copy[index], amount: (copy[index].amount+1)}
            return copy
        }
        else{
            copy.push({
                id: id,
                amount: 1,
                variant_id: 0,
                color: []
            })
            return copy
        }
    })
}
    
const Cards = ({product}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const image = productImages[`../assets/product_pics/${product.images[0]}`]

    return (
        <Link className='article' to={`/product/${product.id-1}`} >
            <img src={image} alt="product images" height={100} className="product_img"/>
            <h2>{product.name}</h2>

            {
                product.variants.length ? 
                <div>
                    {product.variants.map(p => (
                        <div>
                            <span style={{textTransform: 'capitalize'}}>{p.name}</span>: ₦{p.price} per {product.unit}
                        </div>
                    ))}
                </div>
                :
                <span>₦{product.price} per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</span>
                
            }

            <button onClick={(e) => addToCart(e, product.id, setSelectedProducts)}>
                Add to Cart {product.variants[0]? `-${product.variants[0].name} type-`: ''}
            </button>
        </Link>
    )
}

export default Cards