const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const Cards = ({product}) => {
    const image = productImages[`../assets/product_pics/${product.images[0]}`]

    return (
        <article 
            // style={{backgroundImage: `url(${image})`}}
        >
            <img src={image} alt="product images" height={100} className="product_img"/>
            <h2>{product.name}</h2>
            <span>₦{product.price}</span><br />

            <button>Add to Cart </button>
        </article>
    )
}

export default Cards