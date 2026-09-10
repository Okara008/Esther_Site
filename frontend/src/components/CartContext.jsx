import { createContext, useState } from "react";

export const CartContext = createContext()

const CartItemProvider = ({children}) => {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchText, setSearchText] = useState("")

    return (
        <CartContext.Provider value={{selectedProducts, setSelectedProducts, searchText, setSearchText}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartItemProvider