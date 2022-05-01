import style from './style.module.css';
import Logo from '../../img/logo/logo-light.svg';

const { container } = style;

const Footer = () => {
    return(
        <div className={`container-fluid p-5 mt-5 ${container}`}>
            <img src={Logo} alt="logo" className='d-block mx-auto my-5'/>
        </div>
    )
}

export default Footer