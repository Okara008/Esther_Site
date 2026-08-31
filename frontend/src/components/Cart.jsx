import products from "../../content.json"
import CartProduct from "./CartProduct"

const Cart = ({cartItemIndexes}) => {
    cartItemIndexes = [ 4, 8]
    
    return(
        <div className="outerShell">
            <section className="cartSection">
                <h3>{cartItemIndexes.length} Items Selected</h3>
            
            </section>
        </div>
    )
}
export default Cart