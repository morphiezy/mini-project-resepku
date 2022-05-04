import { lazy } from 'react';
import { Routes,Route } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { useSelector } from 'react-redux';


const Login = lazy(()=> import('./pages/Login'))
const Register = lazy(()=> import('./pages/Register'))
const Home = lazy(()=> import('./pages/Home'))
const Search = lazy(()=> import('./pages/Search'));
const Recipe = lazy(()=> import('./pages/Recipe'));
const Article = lazy(()=> import('./pages/Article'));


const App = () => {

  const isAunthenticated = useSelector(state => state.user.authenticated);

  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route 
          element={ <ProtectedRoute isAllowed={isAunthenticated}/> }
        >
          <Route path='/login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/> 
        </Route>
        <Route path='/search' element={<Search/>}/>
        <Route path='/resep/:key' element={<Recipe/>}/>
        <Route path='/artikel/:tag/:key' element={<Article/>}/>
      </Routes>
    </div>
  );
}

export default App;