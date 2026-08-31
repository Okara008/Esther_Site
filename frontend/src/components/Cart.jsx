import CartProduct from "./CartProduct"

const Cart = ({selectedProducts, setDisplayCart}) => {
    // console.log(selectedProducts.colors.map(color => color));
    console.log(selectedProducts);
    return(
        <div className="outerShell">
            <button onClick={() => setDisplayCart(false)}>remove</button>
            <section className="cartSection">
                <h3>{selectedProducts.length} Items Selected</h3>

                {selectedProducts && (<>
                    <p>id #{selectedProducts[0].id}</p>
                    <p> {selectedProducts[0].amount} products</p>
                    <p> {selectedProducts[0].variant_id.map(id => (id))} </p>
                    {selectedProducts[0].colors.map(color => (<p> {color} color</p>))}
                </>)}
            </section>
        </div>
    )
}
export default Cart