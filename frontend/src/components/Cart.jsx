import CartProduct from "./CartProduct"
import { useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";

const Cart = ({setDisplayCart}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)

    useEffect(() => {
        setSelectedProducts(prev => [...prev, 
            {
                id: 2,
                amount: 6,
                variant_id:  [],
                colors: ["red", "blue", "pink"]
            },
            {
                id: 9,
                amount: 10,
                variant_id:  [],
                colors: ["green", "blue", "grey", "black"]
            }
    ])
    }, [])

    return(
        <div className="outerShell">
            <button onClick={() => setDisplayCart(false)}>remove</button>
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>

                {Boolean(selectedProducts.length) && 
                    selectedProducts.map(product => <CartProduct product={product} />)
                }
            </section>
        </div>
    )
}
export default Cart