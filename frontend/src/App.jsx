import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'

function App() {
    return (
	<BrowserRouter>
		<Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
			<Route path='/product/:id' element={<ProductDetails />}/>
        </Routes>
    </BrowserRouter>
    )
}

export default App
