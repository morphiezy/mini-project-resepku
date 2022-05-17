import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect } from "react";

import CardRecipe from "../Card/CardRecipe";
import CardArticle from "../Card/CardArticle";
import Button from "../Button";
import ButtonArrow from "./ButtonArrow";

import style from './style.module.css';

import { useDispatch, useSelector } from "react-redux";
import { fetchFilterContent } from "../../store/Content/thunk";
import { changeFilter } from "../../store/Content/ContentSlice";



const {scrolling_carousel_filter, scrolling_carousel_content, filter_btn , grid_container} = style;


const MyCarousel = ({carousel_title , content_type, grid}) => {

    const carouselData = useSelector(state => state.content[content_type]);
    const currentFilter = carouselData.currentFilter;

    const dispatch = useDispatch();


    useEffect(()=>{
        const contentLength = carouselData.list.length > 0;
        dispatch(fetchFilterContent({initialFetch:!contentLength , contentType: content_type}))
    },[currentFilter])


    return(
        <div className="mt-3 mt-lg-5 py-5">
            <h2 className="fs-2 fw-bold">{carousel_title}</h2>
            <ScrollingCarousel className={`mt-5 ${scrolling_carousel_filter}`}>
                {
                    carouselData.filter.map(filter => 
                        <Button 
                            key={filter.key}
                            text={filter.category || filter.title} 
                            btn_model={currentFilter === filter.key ? "fill" : "stroke"}
                            custom_button={filter_btn}
                            onButtonClick={()=> dispatch(changeFilter({ type: content_type , value : filter.key}))}
                        />
                    )
                }
            </ScrollingCarousel>
            {
                grid ?
                
                <div className={`mt-5 ${grid_container}`}>
                    {
                        carouselData.list.map(item => {
                            return content_type === "article" ? 

                                <CardArticle
                                    key={item.title}
                                    link={item.key}
                                    custom_style="me-3"
                                    thumbnail={item.thumb}
                                    category={item.tags}
                                    title={item.title}
                                /> :
                                <CardRecipe 
                                    custom_style="me-3"
                                    key={item.key}
                                    link={item.key}
                                    img={item.thumb}
                                    title={item.title}
                                    porsi={item.portion}
                                    durasi={item.times}
                                />
                        })
                    }
                </div>
                
                : 

                <ScrollingCarousel 
                    className={`mt-5 ${scrolling_carousel_content}`} 
                    leftIcon={<ButtonArrow google_icon="chevron_left"/>}
                    rightIcon={<ButtonArrow google_icon="chevron_right"/>}
                >
                    {
                        carouselData.list.map(item => {
                            return content_type === "article" ? 

                                <CardArticle
                                    key={item.title}
                                    link={item.key}
                                    custom_style="me-3"
                                    thumbnail={item.thumb}
                                    category={item.tags}
                                    title={item.title}
                                /> :
                                <CardRecipe 
                                    custom_style="me-3"
                                    key={item.key}
                                    link={item.key}
                                    img={item.thumb}
                                    title={item.title}
                                    porsi={item.portion}
                                    durasi={item.times}
                                />
                        })
                    }
                </ScrollingCarousel>
            }
        </div>
    )
}

export default MyCarousel