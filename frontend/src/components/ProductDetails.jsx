import { useParams } from "react-router";
import { useState, useRef } from 'react';
import products from "../../content.json"
const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)

const ProductDetails = () => {
    const { id } = useParams()
    const [product] = useState(products[id])
    const IMG = productImages[`../assets/product_pics/${product.images[0]}`]
    console.log(products[id]);
    return (
    <article>
        {product.name}
        <img src={IMG} alt="Product Image" />
    </article>
    )
}
export default ProductDetails