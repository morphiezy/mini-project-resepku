import { NavLink } from 'react-router-dom';
import style from './style.module.css';

const {container_card,thumbnail_wrapper,label_text,title_text} = style

const CardArticle = ({custom_style,thumbnail,category,title}) => {
    return(
        <NavLink to='/' className={`${custom_style} ${container_card}`}>
            <div className={thumbnail_wrapper}>
                <img src={thumbnail} alt="thumbnail"/>
            </div>
            <div className="my-3 px-4">
                <span className={label_text}>{category}</span>
                <p className={`mt-2 lh-lg ${title_text}`}>{title}</p>
            </div>
        </NavLink>
    )
}

export default CardArticle