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
const CreateRecipe = lazy(()=> import('./pages/CreateRecipe'));
const MyCreation = lazy(()=> import('./pages/MyCreation'));
const Bookmark = lazy(()=> import('./pages/Bookmark'));
const NoMatch = lazy(()=> import('./pages/NoMatch'));



const App = () => {

  const isAuthenticated = useSelector(state => state.user.authenticated);

  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route element={ <ProtectedRoute authenticated={!isAuthenticated}/> }>
          <Route path='/login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/> 
        </Route>
        <Route element={<ProtectedRoute authenticated={isAuthenticated} children={<NoMatch/>}/>}>
          <Route path='/create-recipe' element={<CreateRecipe/>}/>
          <Route path='/my-creation'>
            <Route index element={<MyCreation/>}/>
            <Route path=':key/edit' element ={<CreateRecipe isEdit={true}/>}/>
          </Route>
          <Route path="/bookmark" element={<Bookmark/>}/>
        </Route>
        <Route path='/search' element={<Search/>}/>
        <Route path='/resep/:key' element={<Recipe auth={isAuthenticated}/>}/>
        <Route path='/artikel/:tag/:key' element={<Article/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </div>
  );
}

export default App;