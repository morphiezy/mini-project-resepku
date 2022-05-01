import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect, useState } from "react";

import CardRecipe from "../Card/CardRecipe";
import CardArticle from "../Card/CardAriticle";
import Button from "../Button";
import ButtonArrow from "./ButtonArrow";

import style from './style.module.css';



const {scrolling_carousel_filter, scrolling_carousel_content, filter_btn} = style;


const MyCarousel = ({carousel_title , content_type }) => {

    const [filterList,setFilterList] = useState([]);
    const [currentFilter,setCurrentFilter] = useState(null)

    const [contentList,setContentList] = useState([])

    const changeFilter = (key) => setCurrentFilter(key)


    const requestFullContent = async (firstFetch) => {

        let initialContent = "";

        if(firstFetch){
            const getFilter = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/categorys/${content_type}`);
            const responseFilter = await getFilter.json();
            setFilterList(responseFilter.results);
            initialContent = responseFilter.results[0].key;
            setCurrentFilter(initialContent)
        }
       
        const getContent = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/categorys/${content_type}/${firstFetch ? initialContent : currentFilter}`);
        const responseContent = await getContent.json();
        setContentList(responseContent.results);
    }


    useEffect(()=>{
        const contentLength = contentList.length > 0;
        requestFullContent(!contentLength)
    },[currentFilter])


    return(
        <div className="mt-3 mt-lg-5 py-5">
            <h2 className="fs-2 fw-bold">{carousel_title}</h2>
            <ScrollingCarousel className={`mt-5 ${scrolling_carousel_filter}`}>
                {
                    filterList.map(filter => 
                        <Button 
                            key={filter.key}
                            text={filter.category || filter.title} 
                            btn_model={currentFilter === filter.key ? "fill" : "stroke"}
                            onButtonClick={()=> changeFilter(filter.key)}
                            custom_button={filter_btn}
                        />
                    )
                }
            </ScrollingCarousel>
            <ScrollingCarousel 
                className={`mt-5 ${scrolling_carousel_content}`} 
                leftIcon={<ButtonArrow google_icon="chevron_left"/>}
                rightIcon={<ButtonArrow google_icon="chevron_right"/>}
            >
                {
                    contentList.map(item => {
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
        </div>
    )
}

export default MyCarousel