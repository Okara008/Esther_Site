import CartProduct from "./CartProduct"
import { useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";

const Cart = ({setDisplayCart}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const [ total, setTotal ] = useState(0)
    const [ subtotals, setSubtotals] = useState({})
    
    useEffect(() => {
        const total = Object.values(subtotals).reduce(
            (sum, subtotal) => sum + subtotal,
            0
        )
        setTotal(total)
    }, [subtotals])

    return(
        <div className="outerShell">
            <button onClick={() => setDisplayCart(false)}>remove</button>
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>
                <div className="notTotalSection">
                    {Boolean(selectedProducts.length) && (
                        <section className="cartItemsContainer">{selectedProducts.map(product => <CartProduct product={product} setSelectedProducts={setSelectedProducts} setSubtotals={setSubtotals} />)}</section>
                    )}
                </div>

                <section className="totalSection">
                    Total: <strong>₦{total}</strong>
                </section>
            </section>

        </div>
    )
}
export default Cart