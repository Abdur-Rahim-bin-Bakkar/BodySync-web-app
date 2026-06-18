import { redirect } from "next/navigation"
import { getServerSession } from "../session/server"

export const checkRole = async (role) => {
    const userSession = await getServerSession()
    const userRole = userSession?.user?.role
    if(!userSession){
        redirect('/login')
    }
    if(userRole !== role){
        redirect('/unauthorize')
        
    }

}