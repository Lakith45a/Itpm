import { useEffect ,useContext} from "react"
import axiosInstance from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/userContext"
import { API_PATHS } from "../utils/apiPaths"



export const useUserAuth=()=>{
    const{user,updateUser,clearUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user)return;
        let isMounted = true
        
        const fetchUserInfo = async()=>{
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)

            if(isMounted && response.data){
                updateUser(response.data)
            }
            }catch(error){
                console.error("Error fetching user info:",error);
            if(isMounted){
                clearUser();
                navigate('/login')
                }
            }
        };
        fetchUserInfo()
        return()=>{
            isMounted = false
        };
        
    },[updateUser,clearUser,navigate])
}