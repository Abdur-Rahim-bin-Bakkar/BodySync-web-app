import { redirect } from "next/navigation"

export const checkAuth = async (userSession) => {
    if(!userSession){
        redirect('/login')
        
    }
}