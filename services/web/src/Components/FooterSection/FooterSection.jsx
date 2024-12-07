import { AiFillFacebook } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import './footer_section.css';

export const FooterSection = () => {
    return (
        <div className='footer_section'>
            <div className='social_media'>
                <div className='social_media_icon'>
                    <a href='#facebook'>
                        <AiFillFacebook/>
                    </a>
                </div>
                <div className='social_media_icon'>
                    <a href="#instagram">
                        <AiFillInstagram/>
                    </a>
                </div>
                <div className='social_media_icon'>
                    <a href='#twitter'>
                        <AiOutlineTwitter/>
                    </a>
                </div>
            </div>
            <div className='info'>
                <a href='#info'>Info</a>
                <span>.</span>
                <a href='#support'>Support</a>
                <span>.</span>
                <a href='#marketing'>Marketing</a>
            </div>
            <div className='info'>
                <a href='#tou'>Terms of Use</a>
                <span>.</span>
                <a href='#pp'>Privacy Policy</a>
            </div>
            <div className='creator_info'>
                <p>© Shoe shop | COS3015 </p>
            </div>
        </div>
    )
}