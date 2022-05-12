import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({authenticated, redirectPath = "/", children }) => {
    if(authenticated) return <Outlet/>
    else return children ? children : <Navigate to={redirectPath}/>
}

export { ProtectedRoute}