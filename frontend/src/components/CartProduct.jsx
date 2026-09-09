import { useEffect, useState } from 'react'
import product_details from '../../content.json'

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const CartProduct = ({product, setSubtotals, setSelectedProducts}) => {
    const [product_info, set_product_info] = useState(product_details.filter(p => p.id == product.id)[0])
    const [IMGS, set_IMGS] = useState([])
    const [counter, setCounter] = useState(product.variant.amount)

    const price = product_info?.price ?? product_info?.variants?.find(p => product.variant.id).price

    useEffect(() => {
        for (let i = 0; i < product_info.images.length; i++) {
            let image = product_info.images[i];
            image = productImages[`../assets/product_pics/${image}`];
            set_IMGS(prev => ([...prev, image]))
        }
        console.log(product_details);
        console.log(product);
        console.log(product_details.filter(p => p.id == product.id));
        console.log(product_details.filter(p => p.id == product.id)[0]);
    }, [])
    
    useEffect(() => {
        setSubtotals(prev => ({
            ...prev,
            [product.id]: (price) * counter
        }))

        setSelectedProducts(prev => {
            let copy = [...prev]
            let index = copy.findIndex(e => e.id == product.id)
            copy[index] = {
                ...copy[index],
                variant: {
                    ...copy[index].variant,
                    amount: counter
                }
            }
            return copy
        })
    }, [counter])

    return (
        <div key={product.id} className='cartItem'>
            <div className="cartItemImg"><img src={IMGS[0]} alt="" /></div>

            <div>
                <div className="cartItemTop">
                    <p className='cartItemName'><strong>{product_info.name}</strong> <small className='cartItemVariant'>{product_info?.variants?.find(p => product.variant.id)?.name} </small> <small>- ₦{price}</small></p>
                    <p className="subTotal">SubTotal: <strong>₦{(price) * counter} </strong></p>
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

                    {Boolean(product.colors.length) &&
                        (<p>
                            <strong>Colors: </strong>
                            {product.colors?.map((color, i) => (
                                <small className='cartItemColor'> {color}{i < (product.colors.length-1) ? ',' : '.'}</small>
                            ))}
                        </p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CartProduct