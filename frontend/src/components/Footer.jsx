import SNAP_ICON from '../assets/icons/snapchat_black.png'
import IG_ICON from '../assets/icons/instagram_black.png'

const Footer = () =>{
    const date = new Date()
return(
    <footer>
        <div>
            Copyright &copy; {date.getFullYear()} Estelle Hair Accessory. All rights reserved.
        </div>
        <div className='social_handles'>
            <a href="" title='Visit the SnapChat page'><img src={SNAP_ICON} alt="Snapchat" /></a>

            <a href="" title='Visit the Instagram page'><img src={IG_ICON} alt="Instagram" /></a>
        </div>
    </footer>
)
}

export default Footer