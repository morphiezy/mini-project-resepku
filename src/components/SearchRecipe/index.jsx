import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from "../Button";
import style from "./style.module.css";



const { container_search, input_field, search_btn } = style;


const SearchRecipe = ({custom_style}) => {

  const [value,setValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => setValue(e.target.value);

  const searchingRecipe = (e) =>{
    e.preventDefault();
    return value.trim().length === 0 ? false : navigate(`/search?q=${value}`);
  }

  return (
    <form className={`d-flex ${container_search} ${custom_style}`} onSubmit={searchingRecipe}>
     <input
        className={`form-control ${input_field}`}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Cari resep disini"
        aria-label="default input example"
      />
      <Button
        isSubmit={true}
        btn_model="fill"
        text="Cari"
        custom_button={search_btn}
        onButtonClick={searchingRecipe}
      />
    </form>
  );
};

export default SearchRecipe;
