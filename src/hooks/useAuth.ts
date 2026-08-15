import { useAuthStore} from "../store/authStore";
export function useAuth(){
    const user=useAuthStore((state)=>state.user);
    const accessToken=useAuthStore(( state)=>state.accessToken);
    const setSession=useAuthStore((state)=>state.setSession)
    const clearSession=useAuthStore((state)=>state.clearSession);
    return{
        user, accessToken,
        isAuthenticated:Boolean(accessToken&&user),
        isAdmin:user?.role==="admin",
        setSession, clearSession
    }
}