import style from './style.module.css';

const {container_loading , loading_position, loading_animation} = style;

const Loading = () => {

    return(
        <div className={container_loading}>
            <div className={loading_position}>
                <button className={loading_animation}></button>
            </div>
        </div>
    )
}

export default Loading