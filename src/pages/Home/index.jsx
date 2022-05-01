import SearchRecipe from "../../components/SearchRecipe";
import Navbar from "../../components/Navbar";
import MyCarousel from "../../components/Carousel";
import Footer from "../../components/Footer";

import style from "./style.module.css";
import animation from "../../img/animation.png";

const {
  flex_container,
  highlight_title,
  subtitle_text
} = style;


const Home = () => {

  return (
    <>
      <Navbar />

      <div className="container-fluid px-5">
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
              <SearchRecipe custom_style="mt-5" />
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

          <MyCarousel carousel_title="Daftar Resep Pilihan" content_type="recipes"/>
          <MyCarousel carousel_title="Artikel Seputar Masakan" content_type="article"/> 
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
