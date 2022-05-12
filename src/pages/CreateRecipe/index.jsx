import { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ImageUploading from "react-images-uploading";

import { useMutation } from '@apollo/client';
import { AddRecipe } from "../../GraphQL/Recipe/queries";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

import Image from '../../img/image.svg'
import style from "./style.module.css";




const { container, input_form, container_grid, input_hint, container_upload_image, button_publish , container_preview_thumb} = style;


const CreateRecipe = ({isEdit}) => {

  /* State */

  const [title, setTitle] = useState("");

  const [recipeCriteria, setRecipeCriteria] = useState({
    servings: "",
    times: "",
    dificulty: "",
  });

  const [loading,setLoading] = useState(false)
  const [ingredients, setIngredients] = useState("");
  const [thumbnail,setThumbnail] = useState([]);
  const [base64,setBase64] = useState("");
  const [description,setDescription] = useState("");


  /* Router */

  const navigate = useNavigate();

  /* Swal */

  const MySwal = withReactContent(Swal);

  /* GraphQL */

  const [ createRecipe ] = useMutation(AddRecipe);

  /* Redux */

  const { id, fullname } = useSelector(state => state.user)




  /* Handler Event */
  

  const handleUploadIMG = (imageList) => {
    setThumbnail(imageList)
    setBase64(imageList[0].data_url);
  }

  const validateField = () => {
    
    const titleRecipe = title.length > 0;
    const recipe = Object.values(recipeCriteria).every(value => value.length > 0);
    const ingredient = ingredients.length > 0;
    const banner = base64.length > 0;
    const desc = description.replace(/(<([^>]+)>)/gi, "").length > 0;

    return [titleRecipe,recipe,ingredient,banner,desc].every(value => value === true)
  }

  const buttonPublishClick = async () => {

    if(!validateField()){
      MySwal.fire({
        icon: 'warning',
        title: <h2 className='fs-3'>Oops...</h2>,
        html:<p className='fs-6 lh-lg'>Silahkan lengkapi kolom yang kosong</p>,
      })
      return false
    }
    else{

      const ingredient = ingredients.split(/ [-] /);
      const date = new Date().toJSON().split("T")[0];
      const key = title.split(" ").join("-").toLowerCase()
      

      setLoading(true)

      await createRecipe({ 
        variables : {
          user_id: id,
          key,
          title,
          thumb: base64,
          times: recipeCriteria.times,
          servings: recipeCriteria.servings,
          dificulty: recipeCriteria.dificulty,
          author:{
            user: fullname,
            datePublished:date,
            dateEdited:""
          },
          desc : description,
          ingredient : ingredient,
        }
      })

      setLoading(false)

      return MySwal.fire({
        icon: 'success',
        title: <h2 className='fs-3'>Resep Berhasil Dibuat</h2>,
        html:<p className='fs-6 lh-lg'>Silahkan klik tombol dibawah untuk melihat resep</p>,
        confirmButtonText:"Lihat",
        allowOutsideClick:false
      })
      .then(result => result.isConfirmed ? navigate(`/resep/${key}`) : false)
    }
  }


  return (
    <>
      {
        loading ? <Loading/> :
        
        <>
          <Navbar />

          <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
            <div className={`py-5 ${container}`}>
              <input
                type="text"
                name="recipe-title"
                className={input_form}
                placeholder="Masukan Judul Resep"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
              />
              <div className={`mt-4 ${container_grid}`}>
                <div>
                  <input
                    type="text"
                    name="times"
                    className={input_form}
                    placeholder="Waktu penyajian"
                    value={recipeCriteria.times}
                    onChange={(e)=> setRecipeCriteria({...recipeCriteria, [e.target.name] : e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="servings"
                    className={input_form}
                    placeholder="Porsi penyajian"
                    value={recipeCriteria.servings}
                    onChange={(e)=> setRecipeCriteria({...recipeCriteria, [e.target.name] : e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="dificulty"
                    className={input_form}
                    placeholder="Tingkat kesulitan"
                    value={recipeCriteria.dificulty}
                    onChange={(e)=> setRecipeCriteria({...recipeCriteria, [e.target.name] : e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="ingredient"
                  className={input_form}
                  placeholder="Masukan bahan resep"
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                />
                <div className="form-text mt-2">
                  <span className={input_hint}>
                    Contoh : 1 liter susu cair - 1 sdt merica
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <ImageUploading
                    value={thumbnail}
                    onChange={handleUploadIMG}
                    dataURLKey="data_url"
                    maxFileSize="1000000"
                >
                {
                    ({ imageList, onImageUpload, onImageUpdate , isDragging, dragProps , errors}) => (

                        !imageList.length || errors ?

                        <div 
                            className={container_upload_image} 
                            onClick={()=> !imageList.length ? onImageUpload() : onImageUpdate(0)} 
                            style={{opacity: isDragging ? "0.6" : 1}}
                            {...dragProps}
                        >
                            <img src={Image} alt="icon"/>
                            <>
                              <span className={`mt-4 text-center`}>Tekan atau tarik gambar kesini</span>
                              {errors?.maxFileSize && <code className="mt-2 fw-bold">Maksimal Ukuran 1MB</code>}
                            </>
                        </div>

                        :

                        <>
                          <code type="button" className="float-end mb-3" onClick={()=> onImageUpload(0)}>Change image</code>
                          <div className={container_preview_thumb}>
                            <img src={base64} alt="thumb"/>
                          </div>
                        </>
                    )
                }
                </ImageUploading>
              </div>
              <div className="mt-5">
                  <ReactQuill theme="snow" value={description} onChange={setDescription} placeholder="Masukan deskripsi resep dan cara pembuatan disini"/>
              </div>
              <button className={`mt-5 ${button_publish}`} onClick={buttonPublishClick}>Publish Resep</button>
            </div>
          </div>

          <Footer/>
        </>
      }
    </>
  );
};

export default CreateRecipe;