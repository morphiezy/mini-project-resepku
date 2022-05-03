import { useEffect, useState } from "react";
import { useMobileDetect } from "../../customHooks/useMobileDetect";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchDetailRecipe } from "../../store/Recipe/thunk";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import ContentNotFound from "../../components/ContentNotFound";

import Banner from "../../img/banner-resepku.png";

import ControllerIcon from "../../img/controller.svg";
import TwoUserIcon from "../../img/two-user.svg";
import TimeIcon from "../../img/time.svg";

import style from "./style.module.css";


const {
  title_recipe,
  recipe_info,
  container_thumbnail,
  absolute_board_recipe,
  container_category_recipe,
  container_list_ingredient,
  toggle_ingredient_mobile
} = style;



const Recipe = () => {

  const [loading, setLoading] = useState(false);
  const [show,setShow] = useState(false)

  const [mobile] = useMobileDetect(992);

  const recipe = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const params = useParams();

  const fetchingRecipe = async () => {
    setLoading(true);
    await dispatch(fetchDetailRecipe(params.key));
    setLoading(false);
  };

  useEffect(() => {
    fetchingRecipe();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />

          <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
            <div
              className="special-container py-5"
              style={{ position: "relative" }}
            >
              {recipe.title ? (
                <div className="col-12 col-lg-7">
                  <h1 className={`fs-1 fw-bold lh-base ${title_recipe}`}>
                    {recipe.title}
                  </h1>
                  <p className={`my-4 ${recipe_info}`}>
                    Dibuat pada{" "}
                    <span className="fw-bold">
                      {recipe.author.datePublished}
                    </span>{" "}
                    oleh{" "}
                    <span className="fw-bold text_highlight">
                      {recipe.author.user}
                    </span>
                  </p>
                  <div className={`${container_thumbnail}`}>
                    <img
                      src={recipe.thumb ? recipe.thumb : Banner}
                      alt="thumbnail"
                      className="img-fluid"
                    />
                  </div>
                  <p className="mt-4 mt-lg-5 lh-lg">
                    {" "}
                    {recipe.desc.replace(/(<([^>]+)>)/gi, "")}{" "}
                  </p>

                  <div className="mt-5 py-4">
                    <h4 className="fw-bold fs-4">Cara Pembuatan</h4>
                    <ol className="list-unstyled mt-4">
                      {recipe.step.map((text, index) => (
                        <li key={index} className="w-100">
                          <p className="fs-6 lh-lg">
                            {text.replace(index + 1, "")}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className={`mt-5 ${absolute_board_recipe}`} style={{display:`${mobile && show ? "block" : ""}`}}>
                    <div className={`${container_category_recipe}`}>
                      <img src={TimeIcon} alt="icon" />
                      <span>{recipe.category.times}</span>
                    </div>
                    <div className={`mt-3 ${container_category_recipe}`}>
                      <img src={TwoUserIcon} alt="icon" />
                      <span>{recipe.category.servings}</span>
                    </div>
                    <div className={`mt-3 ${container_category_recipe}`}>
                      <img src={ControllerIcon} alt="icon" />
                      <span className="mt-1">{recipe.category.dificulty}</span>
                    </div>

                    <div className="mt-5">
                      <h4 className="fw-bold fs-4">Ingredient</h4>
                      <ol className={`my-4 ${container_list_ingredient}`}>
                        {recipe.ingredient.map((text, index) => (
                          <li className="mb-2" key={index}>
                            <p className="fs-6 lh-lg m-0">{text}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  {
                      mobile ? 

                        <button className={toggle_ingredient_mobile} onClick={()=> setShow(!show)}>
                            <span className="material-symbols-rounded">edit_note</span>
                        </button> : false
                  }
                </div>
              ) : (
                <ContentNotFound content_name="resep" />
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Recipe;

/*

*/
