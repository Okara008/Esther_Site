import { useEffect, useState } from 'react'
import product_details from '../../content.json'
const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const CartProduct = ({product, setTotal}) => {
    const [product_info, set_product_info] = useState(product_details.filter(p => p.id == product.id)[0])
    const [IMGS, set_IMGS] = useState([])
    const [counter, setCounter] = useState(product.amount)

    useEffect(() => {
        for (let i = 0; i < product_info.images.length; i++) {
            let image = product_info.images[i];
            image = productImages[`../assets/product_pics/${image}`];
            set_IMGS(prev => ([...prev, image]))
        }
        setTotal(prev => prev + (product_info.price * product.amount))
    }, [])
    

    return (
        <div key={product.id} className='cartItem'>
            <div className="cartItemTop">
                <p className='cartItemName'>{product_info.name}</p>
                <p className="subTotal">SubTotal: {product_info.price * counter}</p>
            </div>

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
                            })
                        }
                    />
                    <button onClick={() => setCounter(prev => prev + 1)}>+</button>
                </div>

                <p className='cartItemVariant'> {product.variant_id.map(id => (id))} </p>
                <p>Colors: {product.colors.map((color, i) => (<small className='cartItemColor'> {color}{i < (product.colors.length-1) ? ',' : '.'}</small>))}</p>
            </div>

        </div>
    )
}

export default CartProduct