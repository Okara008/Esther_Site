import { Link } from 'react-router';

const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const Cards = ({product, setSelectedProducts}) => {
    const image = productImages[`../assets/product_pics/${product.images[0]}`]

    return (
        <Link className='article' to={`/product/${product.id-1}`} >
            <img src={image} alt="product images" height={100} className="product_img"/>
            <h2>{product.name}</h2>

            {
                product.variants.length ? 
                <div>
                    {product.variants.map(p => (
                        <div>
                            <span style={{textTransform: 'capitalize'}}>{p.name}</span>: ₦{p.price} per {product.unit}
                        </div>
                    ))}
                </div>
                :
                <span>₦{product.price} per {product.unit} {product.unit.toLowerCase() == 'pack' && `[${product.quantity} items]`}</span>
                
            }

            <button onClick={() => setSelectedProducts(prev => ([
                ...prev,
                {
                    id: 1,
                    amount: 6,
                    variant_id: 2,
                    colors: []
                }
            ]))}>
                Add to Cart
            </button>
        </Link>
    )
}

export default Cards