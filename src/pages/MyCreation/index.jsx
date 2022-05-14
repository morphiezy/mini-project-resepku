import { useSelector } from "react-redux";

import { useMutation, useQuery } from "@apollo/client";
import { GetMyRecipe } from "../../GraphQL/MyRecipe/queries";
import { DeleteRecipe } from "../../GraphQL/Recipe/queries";
import { DeleteBookMark } from "../../GraphQL/Bookmark/queries";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Navbar from "../../components/Navbar";
import Loading from '../../components/Loading';
import CardLarge from "../../components/Card/CardLarge";

import ChefHat from '../../img/chef-hat.svg';
import style from './style.module.css';
import { useNavigate } from "react-router-dom";




const {container_grid , btn_action} = style;


const MyCreation = () => {

  const id = useSelector(state => state.user.id);

  const navigate = useNavigate();

  const { data , loading , refetch } = useQuery(GetMyRecipe ,{ 
    variables : {user_id : id},
    notifyOnNetworkStatusChange: true,
  });

  const [ deleteRecipe ] = useMutation(DeleteRecipe);
  const [ deleteBookmark ] = useMutation(DeleteBookMark);

  const MySwal = withReactContent(Swal);


  const deleteButtonClick  = async (recipeID , title , key) => {

    return MySwal.fire({
      title: <h2 className='fs-3 fw-bold'>Delete Resep</h2>,
      html:<p className='fs-6 lh-lg'>Apakah anda yakin ingin menghapus <br/> <b>{title}</b> ?</p>,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: "Batal",
      allowOutsideClick:false
    })
    .then( async (result) => {

      if (result.isConfirmed) {
        await deleteRecipe({variables : { id: recipeID }});
        await refetch();
        await deleteBookmark({variables : {user_id : id , key : key}})

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
        })
        
        return Toast.fire({
          icon: 'success',
          title: 'Resep berhasil dihapus'
        })
      }

    });
  }


  return (
    <>
      {
        loading ? <Loading/> :

        <>
          <Navbar />
          <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
            <div className="special-container py-5">
                {
                  !loading && !data?.resep.length ?

                  <div className="mx-auto my-5 py-5 text-center h-50vh">
                    <img style={{width:"75px"}} src={ChefHat} alt="icon"/>
                    <p className={`mt-3 text-dark text-opacity-25 fs-5`}>You don't have any <br/> items</p>
                  </div>
                  
                  :

                  <div className={container_grid}>
                    {
                      data?.resep.map(myRecipe => (
                        <CardLarge
                          key={myRecipe.id}
                          banner={myRecipe.thumb}
                          titleRecipe={myRecipe.title}
                          created={myRecipe.author.datePublished}
                          path={myRecipe.key}
                        >
                          <div className='mt-2 mt-md-3 me-5 float-md-end'>
                              <button 
                                className={`fw-bold text-uppercase me-3 ${btn_action}`} 
                                onClick={()=> navigate(`${myRecipe.key}/edit`)}
                              >
                                  EDIT
                              </button>
                              <button 
                                className={`fw-bold text-uppercase text_highlight ${btn_action}`}
                                onClick={()=> deleteButtonClick(myRecipe.id , myRecipe.title , myRecipe.key)}
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
  );
};


export default MyCreation;