import CartProduct from "./CartProduct"
import { useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";

const Cart = ({setDisplayCart}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const [ total, setTotal ] = useState(0)

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
            },
            {
                id: 16,
                amount: 3,
                variant_id:  [],
                colors: ["lemon", "red", "black"]
            }
    ])
    }, [])

    // useEffect(() => {
    //     let total = 0
    //     for (let i = 0; i < selectedProducts.length; i++) {
    //         const amount = Number(selectedProducts[i].amount);
    //         total += amount
    //     }
    //     setTotal(total)
    // }, [selectedProducts])

    return(
        <div className="outerShell">
            <button onClick={() => setDisplayCart(false)}>remove</button>
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>

                {Boolean(selectedProducts.length) && (
                    <section className="cartItemsContainer">{selectedProducts.map(product => <CartProduct product={product} setTotal={setTotal} />)}</section>
                )}

                <section className="totalSection">
                    Total: ₦{total}
                </section>
            </section>

        </div>
    )
}
export default Cart