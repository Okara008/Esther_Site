import { useParams } from "react-router";
import { useState } from 'react';
import products from "../../content.json"
const productImages = import.meta.glob(
    "../assets/product_pics/*",
    { eager: true, query: "?url", import: "default" }
)


const ProductDetails = () => {
    
    const { id } = useParams()
    const [product] = useState(products[id])
    
    return (<>
        {product.name}
    </>)
}
export default ProductDetails