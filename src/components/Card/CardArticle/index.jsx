import { NavLink } from 'react-router-dom';
import style from './style.module.css';

const {container_card,label_text,title_text} = style

const CardArticle = ({custom_style,link,category,title}) => {

    const tag = category.toLowerCase().replace(/( \W |\s)+/g,"-")

    return(
        <NavLink to={`/artikel/${tag}/${link}`} className={`${custom_style} ${container_card}`}>
            <div className="my-3 px-4">
                <span className={label_text}>{category}</span>
                <p className={`mt-2 lh-lg text-capitalize ${title_text}`}>{title}</p>
            </div>
        </NavLink>
    )
}

export default CardArticle