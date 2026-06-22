import { getServerToken } from "../session/server"

export const authHeader = async ()=>{
    const token = await getServerToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    }:{}
    return header;
}