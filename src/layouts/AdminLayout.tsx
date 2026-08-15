import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import AdminSidebar from "../components/admin/AdminSidebar";
export default function AdminLayout(){
    const {user, isAuthenticated, isAdmin}=useAuth();
    if(!isAuthenticated||!user){
        return <Navigate to ="/login" replace/>;
    }
    if(!isAdmin) {
        return <Navigate to="/" replace/>;
    }
    return(
        <div>
            <AdminSidebar/>
            <main><Outlet/></main>
        </div>
    );
}