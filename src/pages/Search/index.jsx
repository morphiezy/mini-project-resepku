import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch , useSelector} from "react-redux";
import { searchRecipe } from "../../store/Content/thunk";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardRecipe from "../../components/Card/CardRecipe";
import Loading from "../../components/Loading";

import style from "./style.module.css";
import ContentNotFound from "../../components/ContentNotFound";




const { container_result, grid_card, thin_text } = style;

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

                        <ContentNotFound content_name="resep"/>
                
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
