import product_details from '../../content.json'

const CartProduct = ({product}) => {
    const product_info = product_details.filter(p => p.id == product.id)
    return (
        <div key={product.id}>
            <p>id #{product.id}</p>
            <p>Name {product_info.name}</p>
            <p> {product.amount} products</p>
            <p> {product.variant_id.map(id => (id))} </p>
            {product.colors.map(color => (<p> {color} color</p>))}

        </div>
    )
}

export default CartProduct