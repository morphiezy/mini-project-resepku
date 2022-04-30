import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({isAllowed, redirectPath = "/", children }) => {
    if(!!isAllowed) return <Navigate replace to={redirectPath}/>
    return children ? children : <Outlet/>
}

export { ProtectedRoute}