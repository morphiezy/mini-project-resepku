import { NavLink } from 'react-router-dom';
import style from './style.module.css'
import porsiIcon from '../../../img/porsi.svg'
import durasiIcon from '../../../img/duration.svg'


const {card_container , thumbnail, card_title, icon , text_info} = style;


const CardRecipe = ({custom_style, img,title,porsi,durasi})=>{
    return(
        <NavLink to='/' className={`${custom_style} ${card_container}`}>
            <div className={thumbnail}>
                <img src={img} alt="thumbnail"/>
            </div>
            <p className={`lh-lg mt-3 ${card_title}`}>{title}</p>
            <div className="mt-3 mb-2 d-flex">
                <div className="d-flex align-items-center  me-3">
                    <img className={icon} src={porsiIcon} alt="icon"/>
                    <span className={text_info}>{porsi}</span>
                </div>
                <div className="d-flex align-items-center">
                    <img className={icon} src={durasiIcon} alt="icon"/>
                    <span className={text_info}>{durasi}</span>
                </div>
            </div>
        </NavLink>
    )
}

export default CardRecipe