import { BrowserRouter, Route, Routes } from 'react-router'
import './styles/Header.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/Cards.css'
import './styles/ProductDetails.css'
import Header from './components/Header'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Footer from './components/Footer'

function App() {
    return (
	<BrowserRouter>
		<Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
			<Route path='/product/:id' element={<ProductDetails />}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    )
}

export default App
