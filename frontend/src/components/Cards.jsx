const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const Cards = ({product}) => {
    const image = productImages[`../assets/product_pics/${product.images[0]}`]

    return (<>
        <small>{product.name}</small>
        <img src={image} alt="profile images" height={100}/>
        <span>{product.price}</span>

        <button>Add to Cart </button>
        <br /><br />
        </>)
}

export default Cards