import {Navigate , Outlet, useLocation} from "react-router-dom";
import {useAuthStore} from "../store/authStore";
export default function ProtectedRoute(){
    const user=useAuthStore((state)=>state.user);
    const location=useLocation();
    if(!user){
        const redirect=`${location.pathname}${location.search}`;
        return(
            <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`}
            replace/>
        );
    }
    return <Outlet/>
}