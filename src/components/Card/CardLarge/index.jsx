import { Link } from 'react-router-dom';

import style from './style.module.css';


const { container, thumbnail, title, created_at } = style

const CardLarge = ({path, banner, titleRecipe, categoryTime, date , children})=>{
    return(
        <div className={container}>
            <div className={`me-3 me-md-4 ${thumbnail}`}>
                <img src={banner} alt="thumbnail" />
            </div>
            <div className='flex-grow-1'>
                <Link to={`/resep/${path}`} className={`mt-2 ${title}`}>{titleRecipe}</Link>
                <span className={`d-block mt-2 ${created_at}`}>{categoryTime} at <span className="text_highlight ms-1 fw-bold">{date}</span></span>
                {children}
            </div>
        </div>
    )
}

export default CardLarge;