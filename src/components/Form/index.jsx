import { useForm } from "react-hook-form";

import style from './style.module.css'

import Input from "./Input";
import Button from "../Button";
import { NavLink } from "react-router-dom";


const {submit_button , footer_text, highlight_text} = style;


const Form = ({onSubmit, inputs, buttonName , suggest_text, action_text , switchTo}) => {

  const { register , setError ,handleSubmit , formState: { errors }} = useForm();
 
  return (
    <form onSubmit={handleSubmit( data => onSubmit(data,setError))}>
        {
          inputs.map( input => 
              <Input 
                  key={input.id}
                  type={input.type}
                  placeholder = {input.placeholder}
                  register={register(input.name,{...input.config})} 
                  error={errors?.[input.name]}
              />
          )
        }
        <Button 
          isSubmit={true}
          text={buttonName}
          custom_button={submit_button}
          btn_model="fill"
        />

        <div className="mt-5 text-center">
          <p className={footer_text}>{suggest_text} 
            <NavLink to={switchTo} className={highlight_text}> {action_text} </NavLink>
          </p>
        </div>
    </form>
  );
};

export default Form;
