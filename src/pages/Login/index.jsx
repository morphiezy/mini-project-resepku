import { useState } from 'react'

import CardForm from '../../components/Card/CardForm'
import Form from '../../components/Form'
import Loading from '../../components/Loading'

import { useDispatch } from 'react-redux'
import { login } from '../../store/User/userSlice'

import { useNavigate } from 'react-router-dom'

import { inputs } from './inputs'



const Login = () => {

    const [loading,setLoading] = useState(false);
    const [isError,setError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (dataLogin) =>{
       setLoading(true)
       const response = await dispatch(login(dataLogin))
       const data = response.payload.data.user.length
       
       if(!data) setError(true)
       else navigate('/')

       return setLoading(false)
    };

    return(
        <>

            { loading ? <Loading/> : false}

            <CardForm 
                title="Welcome Back" 
                subtitle="Silahkan login dahulu untuk menikmati fitur lainnya"
            >
                {
                    isError ? 

                    <div className={`invalid-feedback mb-4`}>
                        <p>Username dan password tidak sesuai.</p>
                    </div>
                    : false
                }
                <Form 
                    onSubmit={handleLogin} 
                    inputs={inputs} 
                    buttonName="Masuk"
                    suggest_text="Tidak punya akun ?"
                    action_text="Daftar disni"
                    switchTo="/register"
                />
            </CardForm>
        </>
    )
}

export default Login