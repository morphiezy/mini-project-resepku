import style from "./style.module.css";

const { custom_form } = style;

const Input = ({ error, register , type, placeholder}) => {
  return (
    <div className="mb-3">
        <input
            type={type}
            placeholder={placeholder}
            className={`form-control ${custom_form}`}
            aria-describedby="fullname_help"
            {...register}
        />
        {
            error ? (
                <div className={`invalid-feedback my-3`}>
                    <p>{error.message}</p>
                </div>
            )
            : 
            ( false )
        }
    </div>
  );
};

export default Input;
