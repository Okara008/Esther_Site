const Footer = () =>{
    const date = new Date()
return(
    <footer>
        <div>
            Copyright &copy; {date.getFullYear()} Estelle Hair Accessory. All rights reserved.
        </div>
    </footer>
)
}

export default Footer