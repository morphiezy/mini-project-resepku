import { useState } from 'react';

import CardForm from '../../components/Card/CardForm'
import Form from '../../components/Form';
import Loading from '../../components/Loading'

import { inputs } from './inputs';
import { REGISTER_USER, FIND_BY_USERNAME } from '../../GraphQL/User/queries';
import { useLazyQuery, useMutation } from '@apollo/client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useNavigate } from 'react-router-dom';



const Register = () => {

  const [findByUsername] = useLazyQuery(FIND_BY_USERNAME)

  const [register] = useMutation(REGISTER_USER , 
    { 
      onCompleted : ()=> registerComplete() , 
    }
  );


  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
  const MySwal = withReactContent(Swal);

  

  const handleRegister = async (formData, setError) => {
    setLoading(true)
    const response = await findByUsername({variables : { username : formData.username}})
    const username = response?.data?.user[0]?.username;

    if(username === formData.username){
      setLoading(false);
      return setError('username', {type:'custom' , message: "Username sudah digunakan"}) 
    }
    else return register({ variables : { objects : formData}})
  }

  const registerComplete = () => {
    setLoading(false)
    MySwal.fire({
      icon:"success",
      title: <h2 className='fs-3'>Pendaftaran Berhasil</h2>,
      html:<p className='fs-6 lh-lg'>Silahkan login dengan menggunakan akun yang telah didaftarkan</p>,
      confirmButtonText:"Login",
      allowOutsideClick:false
    })
    .then(isConfirmed => isConfirmed ? navigate('/login') : false)
  }

  return (
    <>
      { loading ? <Loading/> : false }

      <CardForm
        title="Daftar Akun"
        subtitle="Silahkan isi form dibawah ini untuk membuat akun"
      >
        <Form 
          onSubmit={handleRegister} 
          inputs={inputs} 
          buttonName="Buat Akun"
          suggest_text="Sudah punya akun ?"
          action_text="Masuk!"
          switchTo="/login"
        />
      </CardForm>
    </>
  );
};

export default Register;
