import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticleDetail } from "../../store/Article/thunk";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import ContentNotFound from '../../components/ContentNotFound'

import style from './style.module.css'



const { container_article, thumbnail, article_info, article_desc} = style;

const Article = () => {

    const [loading,setLoading] = useState(false)

    const article = useSelector(state => state.article);
    const params = useParams();
    const dispatch = useDispatch()

    useEffect(()=>{
        async function fetch(){
            setLoading(true)
            const { tag,key } = params;
            await dispatch(fetchArticleDetail(`${tag}/${key}`))
            setLoading(false)
        }

        fetch()
    },[])

    const articleReady = Object.keys(article).every(prop => article[prop] !== "");

    return(
        <>
          {
              loading ? <Loading/> : 

              <>
                <Navbar />

                <>
                    <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 py-5">
                        {
                            articleReady ? 

                            <div className={`py-5 ${container_article}`}>
                                <h1 className="text-center fs-1 fw-bold lh-base">{article.title}</h1>
                                <p className={`text-center my-4 ${article_info}`}>Dibuat pada <span className="fw-bold">{article.date_published}</span> oleh <span className="fw-bold text_highlight">{article.author}</span></p>

                                <div className={`${thumbnail}`}>
                                    <img src={article.thumb} alt="thumbnail"/>
                                </div>

                                <p className={`lh-lg ${article_desc}`}>{article.description}</p>
                            </div>

                            :

                            <ContentNotFound/>
                        }
                    </div> 
                </>

                <Footer/>
              </>
          }
        </>
    )
}

export default Article;