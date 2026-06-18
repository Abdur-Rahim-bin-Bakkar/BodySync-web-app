import { authClient } from "../auth-client";

export const useUserSessionClient  = () => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    
    return session
}