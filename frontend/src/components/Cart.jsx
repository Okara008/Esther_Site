import WHATSAPP_ICON from '../assets/icons/whatsapp_black.png'
import CartProduct from "./CartProduct"
import { useState, useContext, useEffect} from 'react';
import { CartContext } from "./CartContext";
import product_details from '../../content.json'

const Cart = ({setDisplayCart}) => {
    const {selectedProducts, setSelectedProducts} = useContext(CartContext)
    const [ total, setTotal ] = useState(0)
    const [ subtotals, setSubtotals] = useState({})
    
    // useEffect(() => {
    //     setSelectedProducts([
    //         {
    //             id: 3,
    //             variant: {
    //                 id: 0,
    //                 amount: 5
    //             },
    //             colors: []
    //         },
    //         {
    //             id: 8,
    //             variant: {
    //                 id: 0,
    //                 amount: 2
    //             },
    //             colors: ["Blue"]
    //         },
    //     ])

    // }, [])
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
                    <div className='total'>Total: <strong>₦{total.toLocaleString()}</strong></div>
                    <a 
                        target="_blank" 
                        className='checkOut'
                        href={`https://wa.me/2348100153987?text=${encodeURIComponent(
                            "--" + selectedProducts.length + " Items Purchased--\n\n" +

                            selectedProducts.map((product, index) =>{
                                let copy = product_details.find(p => p.id == product.id)
                                console.log(copy);
                                return (
                                    `-${index+1}-\nName - ${copy.name}\nAmount - ${product.variant.amount}\nPrice - ${copy.price}\nSubtotal - ₦${subtotals[product.id]}\n\n`
                                    )
                            }).join("")

                            +"\n\n" + "Total: ₦" +  total
                            )}`
                        }
                                >
                        Check Out <img src={WHATSAPP_ICON} alt="whatsapp" />
                    </a>
                </section>
            </section>

        </div>
    )
}
export default Cart