import { useMobileDetect } from "../../customHooks/useMobileDetect";


import { fetchFilterContent } from "../../store/Content/thunk";
import { useDispatch,useSelector } from "react-redux";

import SearchRecipe from "../../components/SearchRecipe";
import Navbar from "../../components/Navbar";
import MyCarousel from "../../components/Carousel";
import Footer from "../../components/Footer";

import style from "./style.module.css";
import animation from "../../img/animation.png";
import { useEffect } from "react";


const {
  flex_container,
  highlight_title,
  subtitle_text
} = style;


const Home = () => {

  const article = useSelector(state => state.content.article.list);
  const dispatch = useDispatch();
  
  const [mobile] = useMobileDetect(579);

  useEffect(()=>{
    const contentLength = article.length > 0;
    dispatch(fetchFilterContent({initialFetch:!contentLength , contentType: "article"}))
  },[])


  return (
    <>
      <Navbar />

      <div className="container-fluid mt-5 mt-lg-0 px-4">
        <div className="special-container py-4">
          
          {/* Welcome Area */}

          <div className={`row mx-auto ${flex_container}`}>
            <div className="col-lg-6 p-0 pe-lg-5 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
              <h1 className="fw-bold lh-base mt-5 fs-1">
                Temukan berbagai kreasi
                <span className={highlight_title}> resep masakan</span> yang
                enak dan lezat.
              </h1>
              <p className={` mt-3 mt-lg-4 lh-lg fs-6 ${subtitle_text}`}>
                Bantu anda dalam menemukan resep makanan dan minuman yang enak
                dan lezat disertai dengan informasi durasi dan tingkat kesulitan
                saat memasak. Tunggu apa lagi, ayo mulai cari resep sekarang !
              </p>
              {mobile ? false : <SearchRecipe custom_style="mt-5" />}
            </div>
            <div className="col-lg-6 p-lg-5 d-flex justify-content-center justify-content-lg-end">
              <img
                src={animation}
                alt="animation-img"
                className="img-fluid"
                draggable="false"
              />
            </div>
          </div>

          {/* End Welcome Area */}

          {/* Recipe Carousel */}

          <MyCarousel carousel_title="Daftar Resep Pilihan" content_type="recipes"/>

          {/* Article Carousel */}

          <MyCarousel carousel_title="Artikel Seputar Masakan" content_type="article" grid={true}/>
          
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
