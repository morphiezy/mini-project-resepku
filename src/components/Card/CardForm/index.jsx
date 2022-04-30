import style from './style.module.css'
import Logo from '../../../img/logo/logo.svg';


const { card , title_text ,subtitle_text } = style;

const CardForm = ({title,subtitle,children}) => {
    return(
        <div className={`${card}`}>
            <div className='mx-auto mb-5 text-center'>
                <img src={Logo} alt="logo" draggable="false" className='mb-4'/>
                <h1 className={`${title_text}`}>{title}</h1>
                <p className={`mt-2 ${subtitle_text}`}>{subtitle}</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default CardForm