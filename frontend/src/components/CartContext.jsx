import { createContext, useState } from "react";

export const CartContext = createContext()

const CartItemProvider = ({children}) => {
    const [selectedProducts, setSelectedProducts] = useState([])

    return (
        <CartContext.Provider value={{selectedProducts, setSelectedProducts}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartItemProvider