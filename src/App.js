import { lazy } from 'react';
import { Routes,Route } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { useSelector } from 'react-redux';


const Login = lazy(()=> import('./pages/Login'))


const App = () => {

  const isAunthenticated = useSelector(state => state.user.authenticated);

  return (
    <div className="container-fluid">
      <Routes>
        <Route 
          element={ <ProtectedRoute isAllowed={isAunthenticated}/> }
        >
          <Route path='/login' element={<Login/>}/> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;