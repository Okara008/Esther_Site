import { useEffect, useState } from 'react'
import product_details from '../../content.json'
import DELETE_ICON from '../assets/icons/delete_1.png' 
import { Link, useNavigate } from 'react-router-dom'

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const CartProduct = ({index, cartItem, selectedProducts, setSelectedProducts, setDisplayCart}) => {
    const product = product_details.find(product => product.id === cartItem.id);
    const variant = product.variants.find(variant => variant.id === cartItem.variant.id);
    const [IMGS, set_IMGS] = useState([])
    const [counter, setCounter] = useState(cartItem.variant.amount)
    const price = variant.price
    const navigate = useNavigate()

    const deleteCartItem = (productId, variantId) => {
        setSelectedProducts(prev => 
            prev.filter(item => !((item.id == productId) && (item.variant.id == variantId)))
        )
    }

    const linkToProduct = () => {
        setDisplayCart(false)
        navigate(`/product/${product.id}`)
    }

    useEffect(() => {
        let images = []
        for (let i = 0; i < product.images.length; i++) {
            images[i] = productImages[`../assets/product_pics/${product.images[i]}`];
        }
        set_IMGS(([...images]))
    }, [selectedProducts])
    
    useEffect(() => {
        setSelectedProducts(prev => {
            let copy = [...prev]
            let pIndex = copy.findIndex(p => ((p.id == product.id) && (p.variant.id == variant.id)))
            
            copy[pIndex] = {
                ...copy[pIndex],
                variant: {
                    ...copy[pIndex].variant,
                    amount: counter
                }
            }
            return copy
        })

    }, [counter])

    return (
        <div key={product.id} className='cartItem'>
            <Link onClick={linkToProduct} className="cartItemImg"><img src={IMGS[0]} alt="" /></Link>

            <div>
                <div className="cartItemTop">
                    <Link onClick={linkToProduct} className='cartItemName'>{index+1}. <strong>{product.name}</strong> <small className='cartItemVariant'>{variant.name} </small> <small>[₦{price.toLocaleString()}]</small></Link>
                    <p className="subTotal"><strong>₦{(price * counter).toLocaleString()} </strong></p>
                </div>

                <hr />

                <div className="cartItemBottom">
                    <div className="cartItemCounter">
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

                    {Boolean(cartItem.colors.length) &&
                        (<p>
                            <strong>Colors: </strong>
                            {cartItem.colors?.map((color, i) => (
                                <small className='cartItemColor' key={i}> {color}{i < (cartItem.colors.length-1) ? ', ' : '.'}</small>
                            ))}
                        </p>)
                    }

                    <button className="cartItemDelete" onClick={() => deleteCartItem(cartItem.id, cartItem.variant.id)}>
                        <img src={DELETE_ICON} alt="delete" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct