import WHATSAPP_ICON from '../assets/icons/whatsapp_black.png'
import CartProduct from "./CartProduct"
import { useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";
import product_details from '../../content.json'

const checkout = (selectedProducts, product_details, subtotals, total) => {
    return(
        `--${selectedProducts.length} Item(s) to be Purchased--\n\n` +

        selectedProducts.map((product, count) =>{
            let copy = product_details.find(p => p.id == product.id)

            let details = {
                name: copy.name.toUpperCase(),
                variant_details: copy.variants[0],
                amount: product.variant.amount,
                unit: copy.unit,
                quantity: copy.quantity,
                colors: product.colors
            }
            if (copy.variants.length > 1){
                details.variant_details = copy.variants.find(p => p.id == product.variant.id)
            }

            return (
                `-${count+1}-\nName - ${details.name} - ${details.variant_details?.name}\nAmount - ${details.amount} ${details.unit}(s) ${details.quantity > 1 ? `[${details.quantity} per ${details.unit}]` : ""}\nPrice - ₦${details.variant_details?.price}\nColor(s) - ${Boolean(details.colors.length) ? details.colors : "none"}\nSubtotal - ₦${subtotals[product.id]}\n\n`
            )
        }).join("")

        + `\nTotal: ₦${total}`
    )
}

const Cart = ({setDisplayCart}) => {
    const PHONENUMBER = "2348100153987"
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
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>
                <div className="notTotalSection">
                    {Boolean(selectedProducts.length) && (
                        <section className="cartItemsContainer">{selectedProducts.map((product, index) => <CartProduct key={index} product={product} setSelectedProducts={setSelectedProducts} setSubtotals={setSubtotals} />)}</section>
                    )}
                </div>

                <section className="bottomCartSection">
                    <div className='totalSection'>Total: <strong>₦{total.toLocaleString()}</strong></div>

                    <div>
                        <button className="remove" onClick={() => setDisplayCart(false)}>Continue Shopping</button>
                        <a
                            target="_blank"
                            className='checkOut'
                            href={`https://wa.me/${PHONENUMBER}?text=${encodeURIComponent( checkout(selectedProducts, product_details, subtotals, total) )}`}
                        >
                            Check Out <img src={WHATSAPP_ICON} alt="whatsapp" />
                        </a>
                    </div>
                </section>
            </section>

        </div>
    )
}
export default Cart