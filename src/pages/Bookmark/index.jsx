
import { useQuery, useMutation } from "@apollo/client"
import { GetAllBookmark, DeleteBookMark } from "../../GraphQL/Bookmark/queries"


import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar"
import CardLarge from "../../components/Card/CardLarge"

import ChefHat from '../../img/chef-hat.svg';

import style from './style.module.css';
import { useSelector } from "react-redux";



const {container_grid,btn_action} = style;


const Bookmark = () => {

    const user_id = useSelector(state => state.user.id);

    const { data, loading , refetch} = useQuery(GetAllBookmark,{
        variables:{
            user_id
        }
    });

    const [ deleteBookmark ] = useMutation(DeleteBookMark);

    const deleteBtnClick = async (key,id) => {
        await deleteBookmark({variables : {key : key , user_id : user_id}});
        return await refetch();
    }


    return(
        <>
            {
                loading ? <Loading/> :

                <>
                    <Navbar />
                    <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
                        <div className="special-container py-5">
                            {
                            !loading && !data?.bookmark.length ?

                            <div className="mx-auto my-5 py-5 text-center h-50vh">
                                <img style={{width:"75px"}} src={ChefHat} alt="icon"/>
                                <p className={`mt-3 text-dark text-opacity-25 fs-5`}>You don't have any <br/> items</p>
                            </div>
                            
                            : 

                            <div className={container_grid}>
                                {
                                data?.bookmark.map(bookmark => (
                                    <CardLarge
                                    key={bookmark.id}
                                    banner={bookmark.thumb}
                                    titleRecipe={bookmark.title}
                                    categoryTime="Added"
                                    date={bookmark.added_at}
                                    path={bookmark.key}
                                    >
                                    <div className='mt-2 mt-md-3 me-5 float-md-end'>
                                        <button 
                                            className={`fw-bold text-uppercase text_highlight ${btn_action}`}
                                            onClick={()=> deleteBtnClick(bookmark.key)}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                    </CardLarge>
                                ))
                                }
                            </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Bookmark