import style from "./style.module.css";

const { button , button_fill , button_stroke } = style;

const Button = ({ isSubmit, text, custom_button , btn_model , onButtonClick }) => {
   
  const model = btn_model === "fill" ? button_fill : button_stroke;

  return (
    <button 
        submit = {isSubmit ? "submit" : ""}
        model={btn_model}
        className={`btn ${button} ${model} ${custom_button}`}
        onClick={onButtonClick}
    >
      {text}
    </button>
  );
};

export default Button;
