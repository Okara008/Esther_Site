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
                `-${count+1}-\nName - ${details.name} - ${details.variant_details?.name}\nAmount - ${details.amount} ${details.unit}(s) ${details.quantity > 1 ? `[${details.quantity} per ${details.unit}]` : ""}\nPrice - ₦${details.variant_details?.price}\nColor(s) - ${Boolean(details.colors.length) ? details.colors : "none"}\nSubtotal - ₦${details.variant_details.price * details.amount}\n\n`
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
    
    // useEffect(() => {
    //     setSelectedProducts([
    //         {
    //             id: 1,
    //             variant: {
    //                 id: 1,
    //                 amount: 1
    //             },
    //             colors: ["Blue x13", "red x5"]
    //         },
    //         {
    //             id: 6,
    //             variant: {
    //                 id: 1,
    //                 amount: 2
    //             },
    //             colors: ["Blue x23", "red x5"]
    //         },
    //         {
    //             id: 6,
    //             variant: {
    //                 id: 2,
    //                 amount: 3
    //             },
    //             colors: ["Blue x33", "red x5"]
    //         },
    //     ])
    // }, [])

    useEffect(() => {
        setTotal(
            selectedProducts.reduce((total, cartItem) => {
                const product = product_details.find(
                    product => product.id === cartItem.id
                );
                    
                const variant = product.variants.find(
                    variant => variant.id === cartItem.variant.id
                );
                return total + variant.price * cartItem.variant.amount;
            }, 0)
            )
            
    }, [selectedProducts])

    return(
        <div className="outerShell">
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>
                <div className="notTotalSection">
                    {Boolean(selectedProducts.length) && (
                        <section className="cartItemsContainer">
                            {selectedProducts.map((cartItem, index) => 
                                <CartProduct key={`${cartItem.id}-${cartItem.variant.id}`} cartItem={cartItem} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} index={index} />)}
                        </section>
                    )}
                </div>

                <section className="bottomCartSection">
                    <div className='totalSection'>Total: <strong>₦{total.toLocaleString()}</strong></div>

                    <div>
                        <button className="remove" onClick={() => setDisplayCart(false)}>Continue Shopping</button>
                        <a
                            target="_blank"
                            className='checkOut'
                            onClick={(e) => {
                                // console.log(checkout(selectedProducts, product_details, subtotals, total))
                                if (!selectedProducts.length) e.preventDefault()
                            }}
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