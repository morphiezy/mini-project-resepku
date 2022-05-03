import style from './style.module.css';
import animation from '../../img/animation-2.png'



const {flex_container , thin_text} = style

const ContentNotFound = ({content_name}) => {
  return (
    <div className={`row mx-auto ${flex_container}`}>
      <div className="col-lg-6 d-flex justify-content-center ">
        <img
          src={animation}
          alt="animation-img"
          className="img-fluid"
          draggable="false"
        />
      </div>
      <div className="col-lg-6 p-0 pe-lg-5 mt-5 mt-lg-0 d-flex flex-column justify-content-center">
        <h2 className="fw-bold fs-2 text-capitalize">Yaaah...</h2>
        <p className={`mt-3 mb-0 lh-lg ${thin_text}`}>
          Sepertinya untuk saat ini kami tidak dapat menemukan {content_name} yang kamu minta.
        </p>
        <p className={`mt-1 mb-0 ${thin_text}`}>
          Yuk coba cari dengan keyword lain.
        </p>
      </div>
    </div>
  );
};


export default ContentNotFound