import style from './style.module.css';

const { container_button } = style;

const ButtonArrow = ({google_icon}) => {
    return (
        <div className={container_button}>
            <span className="material-symbols-rounded">
                {google_icon}
            </span>
        </div>
    )
}

export default ButtonArrow