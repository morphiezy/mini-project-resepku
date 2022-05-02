import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch , useSelector} from "react-redux";
import { searchRecipe } from "../../store/Content/thunk";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardRecipe from "../../components/Card/CardRecipe";
import Loading from "../../components/Loading";

import style from "./style.module.css";
import animation from '../../img/animation-2.png'




const { container_result, grid_card, thin_text , flex_container} = style;

const Search = () => {

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const results = useSelector(state => state.content.search.results);

  const fetchResep = async () => {
    setLoading(true);
    await dispatch(searchRecipe(searchParams.get('q')))
    setLoading(false);
  };

  useEffect(() => {
    fetchResep();
  }, [searchParams]);


  return (
    <>
      {
        loading ?  <Loading /> :

        <>
          <Navbar />

          <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
            <div className="special-container py-5">
                {
                    results.length > 0 ?
                        <>
                            <h3 className="fw-bold fs-4 text-capitalize">
                                Resep {searchParams.get("q")}{" "}
                            </h3>
                            <p className={`mt-3 ${thin_text}`}>
                                Menampilkan {results.length} hasil untuk pencarian{" "}
                                <span className="fw-bold text-capitalize">
                                "{searchParams.get("q")}"
                                </span>
                            </p>
                            <div className={`mt-5 ${container_result}`}>
                                {results.map((resep) => (
                                <CardRecipe
                                    key={resep.key}
                                    custom_style={grid_card}
                                    link={resep.key}
                                    img={resep.thumb}
                                    title={resep.title}
                                    porsi={resep.serving}
                                    durasi={resep.times}
                                />
                                ))}
                            </div>
                        </>

                        :

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
                                <p className={`mt-3 mb-0 lh-lg ${thin_text}`}> Sepertinya kami tidak dapat menemukan resep <span className="fw-bold text-capitalize"> "{searchParams.get("q")}" </span> yang kamu minta.</p>
                                <p className={`mt-1 mb-0 ${thin_text}`}> Yuk coba cari dengan keyword lain.</p>
                            </div>
                        </div>
                
                }
            </div>
          </div>

          <Footer />
        </>
      }
    </>
  );
};

export default Search;
