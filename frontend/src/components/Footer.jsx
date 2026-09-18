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
            <a href="https://www.snapchat.com/add/esther_okara23?share_id=yoCfEUuPg88&locale=en-US" target='_blank' title='Visit the SnapChat Page'><img src={SNAP_ICON} alt="Snapchat" /></a>

            <a href="" title='Visit the Instagram Page'><img src={IG_ICON} alt="Instagram" /></a>
        </div>
    </footer>
)
}

export default Footer